import React from 'react';

import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
// import { nCardPlaceholders } from '../projectcard/nCardPlaceholder';

import { NotificationCard, NotificationCardMini } from './notificationCard';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import messages from './messages';

export const NotificationResultsMini = props => {
  return <NotificationResults {...props} useMiniCard={true} />;
};

export const NotificationResults = props => {
  const state = props.state;
  // const cardWidthClass = 'w-third-l';

  return (
    <div className={props.className}>
        {state.isLoading ? (
          <span>&nbsp;</span>
        ) : (
          !state.isError && (
            
            !props.useMiniCard && <p className="blue-grey ml3 pt2 f7"><FormattedMessage
              {...messages.showingXProjectsOfTotal}
              values={{
                numProjects: state.notifications && state.notifications.length,
                numRange:
                  state.pagination &&
                  state.pagination.page > 1 &&
                  state.pagination.page * state.pagination.perPage <= state.pagination.total &&
                  [': ', state.pagination.page * state.pagination.perPage, ' '].join(''),
                numTotalProjects: (
                  <FormattedNumber value={state.pagination && state.pagination.total} />
                ),
              }}
            /></p>
          )
        )}
      {state.isError ? (
        <div className="bg-tan pa4">
          <FormattedMessage
            {...messages.errorLoadingTheXForY}
            values={{
              xWord: <FormattedMessage {...messages.projects} />,
              yWord: 'Notifications',
            }}
          />
          <div className="pa2">
            <button className="pa1" onClick={() => props.retryFn()}>
              Retry
            </button>
          </div>
        </div>
      ) : null}
      <div className={`cf ${!props.useMiniCard ? 'mh5 mh2-ns' : ''} db`}>
        <ReactPlaceholder
          // customPlaceholder={nCardPlaceholders(5, cardWidthClass)}
          ready={!state.isLoading}
          type="media"
          rows={10}
        >
          <NotificationCards pageOfCards={state.notifications} useMiniCard={props.useMiniCard} />
        </ReactPlaceholder>
      </div>
    </div>
  );
};

const NotificationCards = props => {
  if (!props || !props.pageOfCards || props.pageOfCards.length === 0) {
    return null;
  }
  const filterFn = props.useMiniCard ? n => !n.read : n => n;
  const filteredCards = props.pageOfCards.filter(filterFn);

  if (filteredCards < 1) {
    return (<div className="mb3 blue-grey"><FormattedMessage {...messages.noUnreadMessages}/></div>);
  }

  return filteredCards.map((card, n) =>
    props.useMiniCard ? (
      <NotificationCardMini {...card} key={n} />
    ) : (
      <NotificationCard {...card} key={n} />
    ),
  );
};
