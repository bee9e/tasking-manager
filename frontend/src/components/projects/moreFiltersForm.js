import React from 'react';
import { Link } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { useQueryParam } from 'use-query-params';

import { Button } from '../button';
import { useTagAPI } from '../../hooks/UseTagAPI';
import { useExploreProjectsQueryParams } from '../../hooks/UseProjectsQueryAPI';
import { MappingTypeFilterPicker } from './mappingTypeFilterPicker';
import { TagFilterPickerCheckboxes } from './tagFilterPicker';
import { CommaArrayParam } from '../../utils/CommaArrayParam';
import messages from './messages';

export const MoreFiltersForm = props => {
  /* one useQueryParams for the main form */
  const [formQuery, setFormQuery] = useExploreProjectsQueryParams();

  const handleInputChange = event => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'types') {
      //handle mappingTypes toggles in its separate fn inside that component
      return;
    }
    setFormQuery(
      {
        ...formQuery,
        page: undefined,
        [name]: value,
      },
      'pushIn',
    );
  };

  /* dereference the formQuery */
  const {
    campaign: campaignInQuery,
    organisation: orgInQuery,
    location: countryInQuery,
  } = formQuery;
  const [campaignAPIState] = useTagAPI([], 'campaigns');
  const [orgAPIState] = useTagAPI([], 'organisations');
  const [countriesAPIState] = useTagAPI([], 'countries');

  /* another useQueryParam for the second form */
  const [mappingTypesInQuery, setMappingTypes] = useQueryParam('types', CommaArrayParam);

  const fieldsetStyle = 'w-100 bn';
  const titleStyle = 'w-100 db ttu fw5 blue-grey';

  return (
    <form className="pt4" onChange={handleInputChange}>
      <fieldset id="mappingType" className={fieldsetStyle}>
        <legend className={titleStyle}>
          <FormattedMessage {...messages.typesOfMapping} />
        </legend>
        <MappingTypeFilterPicker
          mappingTypes={mappingTypesInQuery}
          setMappingTypesQuery={setMappingTypes}
        />
      </fieldset>

      <TagFilterPickerCheckboxes
        fieldsetName="campaign"
        fieldsetStyle={fieldsetStyle}
        titleStyle={titleStyle}
        selectedTag={campaignInQuery}
        tagOptionsFromAPI={campaignAPIState}
        setQueryForChild={setFormQuery}
        allQueryParamsForChild={formQuery}
      />

      <TagFilterPickerCheckboxes
        fieldsetName="organisation"
        fieldsetStyle={`${fieldsetStyle} mt3`}
        titleStyle={titleStyle}
        selectedTag={orgInQuery}
        tagOptionsFromAPI={orgAPIState}
        setQueryForChild={setFormQuery}
        allQueryParamsForChild={formQuery}
      />

      <TagFilterPickerCheckboxes
        fieldsetName="location"
        fieldsetStyle={`${fieldsetStyle} mt3`}
        titleStyle={titleStyle}
        selectedTag={countryInQuery}
        tagOptionsFromAPI={countriesAPIState}
        setQueryForChild={setFormQuery}
        allQueryParamsForChild={formQuery}
      />
      <div className="tr w-100 mt3">
        <Link to="/explore">
          <Button className="bg-white blue-dark mr1 f6 pv2">
            <FormattedMessage {...messages.clear} />
          </Button>
        </Link>
        <Link to={props.currentUrl}>
          <Button className="white bg-red mr1 f6 dib pv2">
            <FormattedMessage {...messages.apply} />
          </Button>
        </Link>
      </div>
    </form>
  );
};
