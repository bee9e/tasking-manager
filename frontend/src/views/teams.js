import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, redirectTo } from '@reach/router';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-final-form';

import messages from './messages';
import { useFetch } from '../hooks/UseFetch';
import { pushToLocalJSONAPI } from '../network/genericJSONRequest';
import { Members } from '../components/teamsAndOrgs/members';
import { TeamInformation, TeamForm, TeamsManagement } from '../components/teamsAndOrgs/teams';
import { FormSubmitButton, CustomButton } from '../components/button';
import { DeleteModal } from '../components/deleteModal';

export function ListTeams() {
  const userDetails = useSelector(state => state.auth.get('userDetails'));
  // TO DO: filter teams of current user
  const [error, loading, teams] = useFetch(`teams/`);

  const placeHolder = (
    <div className="pb4 bg-tan">
      <div className="w-50-ns w-100 cf ph6-l ph4">
        <TextBlock rows={1} className="bg-grey-light h3" />
        <TextBlock rows={1} className="bg-grey-light h2 mt2" />
      </div>
      <RectShape className="bg-white dib mv2 mh6" style={{ width: 250, height: 300 }} />
      <RectShape className="bg-white dib mv2 mh6" style={{ width: 250, height: 300 }} />
    </div>
  );

  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      customPlaceholder={placeHolder}
      delay={10}
      ready={!error && !loading}
    >
      <TeamsManagement teams={teams.teams} userDetails={userDetails} />
    </ReactPlaceholder>
  );
}

const joinTeamRequest = (team_id, username, role, token) => {
  pushToLocalJSONAPI(
    `teams/${team_id}/actions/join/`,
    JSON.stringify({ username: username, role: role }),
    token,
    'POST',
  );
};
const leaveTeamRequest = (team_id, username, role, token) => {
  pushToLocalJSONAPI(
    `teams/${team_id}/actions/leave/`,
    JSON.stringify({ username: username, role: role }),
    token,
    'POST',
  );
};

export function CreateTeam() {
  const userDetails = useSelector(state => state.auth.get('userDetails'));
  const token = useSelector(state => state.auth.get('token'));
  const [managers, setManagers] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTeamId, setNewTeamId] = useState(null);

  useEffect(() => {
    if (userDetails && userDetails.username && managers.length === 0) {
      setManagers([{ username: userDetails.username, pictureUrl: userDetails.pictureUrl }]);
    }
  }, [userDetails, managers]);

  useEffect(() => {
    if (newTeamId) {
      redirectTo(`/manage/teams/${newTeamId}`);
    }
  }, [newTeamId]);

  const addManagers = values => {
    const newValues = values.filter(
      newUser => !managers.map(i => i.username).includes(newUser.username),
    );
    setManagers(managers.concat(newValues));
  };
  const removeManagers = username => {
    setManagers(managers.filter(i => i.username !== username));
  };
  const addMembers = values => {
    const newValues = values.filter(
      newUser => !members.map(i => i.username).includes(newUser.username),
    );
    setMembers(members.concat(newValues));
  };
  const removeMembers = username => {
    setMembers(members.filter(i => i.username !== username));
  };
  const createTeam = payload => {
    payload.organisation_id = payload.organisation;
    delete payload['organisation'];
    pushToLocalJSONAPI('teams/', JSON.stringify(payload), token, 'POST')
      .then(result => {
        managers.filter(user => user.username !== userDetails.username)
          .map(user => joinTeamRequest(result.teamId, user.username, 'MANAGER', token));
        members.map(user => joinTeamRequest(result.teamId, user.username, 'MEMBER', token));
        setNewTeamId(result.teamId);
      });
  };

  return (
    <Form
      onSubmit={values => createTeam(values)}
      render={({ handleSubmit, pristine, form, submitting, values }) => {
        return (
          <form onSubmit={handleSubmit} className="blue-grey">
            <div className="cf pa4 bg-tan vh-100">
              <h3 className="f2 mb3 ttu blue-dark fw7 barlow-condensed">
                <FormattedMessage {...messages.newTeam} />
              </h3>
              <div className="w-40-l w-100 fl">
                <div className="bg-white b--grey-light ba pa4 mb3">
                  <h3 className="f3 blue-dark mv0 fw6">
                    <FormattedMessage {...messages.teamInfo} />
                  </h3>
                  <TeamInformation />
                </div>
              </div>
              <div className="w-40-l w-100 fl pl5-l pl0 ">
                <div className="mb3">
                  <Members
                    addMembers={addManagers}
                    removeMembers={removeManagers}
                    members={managers}
                    creationMode={true}
                  />
                </div>
                <div className="mb3">
                  <Members
                    addMembers={addMembers}
                    removeMembers={removeMembers}
                    members={members}
                    creationMode={true}
                    type={'members'}
                  />
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 cf bg-white h3 w-100">
              <div className="w-80-ns w-60-m w-50 h-100 fl tr">
                <Link to={'../'}>
                  <CustomButton className="bg-white mr5 pr2 h-100 bn bg-white blue-dark">
                    <FormattedMessage {...messages.cancel} />
                  </CustomButton>
                </Link>
              </div>
              <div className="w-20-l w-40-m w-50 h-100 fr">
                <FormSubmitButton
                  disabled={submitting || pristine || !values.organisation || !values.visibility}
                  className="w-100 h-100 bg-red white"
                  disabledClassName="bg-red o-50 white w-100 h-100"
                >
                  <FormattedMessage {...messages.createTeam} />
                </FormSubmitButton>
              </div>
            </div>
          </form>
        );
      }}
    ></Form>
  );
}

export function EditTeam(props) {
  const userDetails = useSelector(state => state.auth.get('userDetails'));
  const token = useSelector(state => state.auth.get('token'));
  const [error, loading, team] = useFetch(`teams/${props.id}/`);
  const [initManagers, setInitManagers] = useState(false);
  const [managers, setManagers] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    if (!initManagers && team && team.members) {
      setManagers(team.members.filter(member => member.active && member.function === 'MANAGER'));
      setMembers(team.members.filter(member => member.active && member.function === 'MEMBER'));
      setInitManagers(true);
    }
  }, [team, managers, initManagers]);

  const addManagers = values => {
    const newValues = values.filter(
      newUser => !managers.map(i => i.username).includes(newUser.username),
    );
    setManagers(managers.concat(newValues));
  };
  const removeManagers = username => {
    setManagers(managers.filter(i => i.username !== username));
  };
  const addMembers = values => {
    const newValues = values.filter(
      newUser => !members.map(i => i.username).includes(newUser.username),
    );
    setMembers(members.concat(newValues));
  };
  const removeMembers = username => {
    setMembers(members.filter(i => i.username !== username));
  };
  const updateManagers = () => {
    managers
      .filter(user => !team.managers.map(manager => manager.username).includes(user))
      .forEach(user => joinTeamRequest(team.teamId, user, 'MANAGER', token));
    team.managers
      .filter(i => !managers.includes(i.username))
      .forEach(manager => leaveTeamRequest(team.teamId, manager.username, 'MANAGER', token));
  };
  const updateMembers = () => {
    members
      .filter(user => !team.members.map(member => member.username).includes(user))
      .forEach(user => joinTeamRequest(team.teamId, user, 'MEMBER', token));
    team.members
      .filter(i => !members.includes(i.username))
      .forEach(member => leaveTeamRequest(team.teamId, member.username, 'MEMBER', token));
  };

  const updateTeam = payload => {
    pushToLocalJSONAPI(`teams/${props.id}/`, JSON.stringify(payload), token, 'PATCH');
  };

  return (
    <div className="cf pa4 bg-tan">
      <div className="cf">
        <h3 className="f2 ttu blue-dark fw7 barlow-condensed v-mid ma0 dib ttu">
          <FormattedMessage {...messages.manageTeam} />
        </h3>
        <DeleteModal id={team.teamId} name={team.name} type="teams" />
      </div>
      <div className="w-40-l w-100 mt4 fl">
        <TeamForm
          userDetails={userDetails}
          team={{
            name: team.name,
            description: team.description,
            inviteOnly: team.inviteOnly,
            visibility: team.visibility,
            organisation: team.organisation,
          }}
          updateTeam={updateTeam}
          disabledForm={error || loading}
        />
      </div>
      <div className="w-40-l w-100 mt4 pl5-l pl0 fl">
        <Members
          addMembers={addManagers}
          removeMembers={removeManagers}
          saveMembersFn={updateManagers}
          members={managers}
        />
        <div className="h1"></div>
        <Members
          addMembers={addMembers}
          removeMembers={removeMembers}
          saveMembersFn={updateMembers}
          members={members}
          type="members"
        />
      </div>
    </div>
  );
}
