import { defineMessages } from 'react-intl';

/**
 * Internationalized messages for use on header.
 */
export default defineMessages({
  legend: {
    id: 'project.tasks.map.legend',
    defaultMessage: 'Legend',
  },
  typesOfMapping: {
    id: 'project.typesOfMapping',
    defaultMessage: 'Types of Mapping',
  },
  roads: {
    id: 'project.typesOfMapping.roads',
    defaultMessage: 'Roads',
  },
  buildings: {
    id: 'project.typesOfMapping.buildings',
    defaultMessage: 'Buildings',
  },
  landUse: {
    id: 'project.typesOfMapping.landUse',
    defaultMessage: 'Land use',
  },
  waterways: {
    id: 'project.typesOfMapping.waterways',
    defaultMessage: 'Waterways',
  },
  other: {
    id: 'project.typesOfMapping.other',
    defaultMessage: 'Other',
  },
  editor: {
    id: 'project.editor',
    defaultMessage: 'Editor',
  },
  selectEditor: {
    id: 'project.editor.select',
    defaultMessage: 'Select editor',
  },
  tasks: {
    id: 'project.tasks',
    defaultMessage: 'Tasks',
  },
  taskId: {
    id: 'project.taskId',
    defaultMessage: 'Task #{id}',
  },
  instructions: {
    id: 'project.instructions',
    defaultMessage: 'Instructions',
  },
  imagery: {
    id: 'project.imagery',
    defaultMessage: 'Imagery',
  },
  customTMSLayer: {
    id: 'project.imagery.tms',
    defaultMessage: 'Custom TMS Layer',
  },
  customWMSLayer: {
    id: 'project.imagery.wms',
    defaultMessage: 'Custom WMS Layer',
  },
  customWMTSLayer: {
    id: 'project.imagery.wmts',
    defaultMessage: 'Custom WMTS Layer',
  },
  customLayer: {
    id: 'project.imagery.customLayer',
    defaultMessage: 'Custom Layer',
  },
  noImageryDefined: {
    id: 'project.imagery.noDefined',
    defaultMessage: 'Any available source',
  },
  mapATask: {
    id: 'project.selectTask.footer.button.mapRandomTask',
    defaultMessage: 'Map a task',
  },
  mapSelectedTask: {
    id: 'project.selectTask.footer.button.mapSelectedTask',
    defaultMessage: 'Map selected task',
  },
  mapAnotherTask: {
    id: 'project.selectTask.footer.button.mapAnotherTask',
    defaultMessage: 'Map another task',
  },
  validateATask: {
    id: 'project.selectTask.footer.button.validateRandomTask',
    defaultMessage: 'Validate a task',
  },
  validateSelectedTask: {
    id: 'project.selectTask.footer.button.validateSelectedTask',
    defaultMessage: 'Validate selected task',
  },
  validateAnotherTask: {
    id: 'project.selectTask.footer.button.validateAnotherTask',
    defaultMessage: 'Validate another task',
  },
  taskLastUpdate: {
    id: 'project.tasks.list.lastUpdate',
    defaultMessage: 'Last updated by {user}',
  },
  taskStatus_READY: {
    id: 'project.tasks.status.ready',
    defaultMessage: 'Available for mapping',
  },
  taskStatus_MAPPED: {
    id: 'project.tasks.status.mapped',
    defaultMessage: 'Ready for validation',
  },
  taskStatus_LOCKED: {
    id: 'project.tasks.status.locked',
    defaultMessage: 'Locked',
  },
  taskStatus_LOCKED_FOR_MAPPING: {
    id: 'project.tasks.status.lockedForMapping',
    defaultMessage: 'Locked for mapping',
  },
  taskStatus_LOCKED_FOR_VALIDATION: {
    id: 'project.tasks.status.lockedForValidation',
    defaultMessage: 'Locked for validation',
  },
  taskStatus_VALIDATED: {
    id: 'project.tasks.status.validated',
    defaultMessage: 'Finished',
  },
  taskStatus_INVALIDATED: {
    id: 'project.tasks.status.invalidated',
    defaultMessage: 'More mapping needed',
  },
  taskStatus_BADIMAGERY: {
    id: 'project.tasks.status.badImagery',
    defaultMessage: 'Unavailable',
  },
  taskStatus_SPLIT: {
    id: 'project.tasks.status.split',
    defaultMessage: 'Splitted',
  },
  sortById: {
    id: 'project.tasks.sorting.id',
    defaultMessage: 'Sort by task number',
  },
  sortByLastUpdate: {
    id: 'project.tasks.sorting.date',
    defaultMessage: 'Last updated first',
  },
  filterAll: {
    id: 'project.tasks.filter.all',
    defaultMessage: 'All',
  },
  filterReadyToValidate: {
    id: 'project.tasks.filter.readyToValidate',
    defaultMessage: 'Ready to validate',
  },
  filterReadyToMap: {
    id: 'project.tasks.filter.readyToMap',
    defaultMessage: 'Ready to map',
  },
  noTasksFound: {
    id: 'project.tasks.filter.noTasksFound',
    defaultMessage: 'No tasks were found.',
  },
  completion: {
    id: 'project.tasks.action.completion',
    defaultMessage: 'Completion',
  },
  history: {
    id: 'project.tasks.action.history',
    defaultMessage: 'History',
  },
  finishMappingTitle: {
    id: 'project.tasks.action.finish_mapping.title',
    defaultMessage: 'Once you have finished mapping',
  },
  instructionsSelect: {
    id: 'project.tasks.action.instructions.select_task',
    defaultMessage: 'Select one of the options below that matches your edit status',
  },
  instructionsComment: {
    id: 'project.tasks.action.instructions.leave_comment',
    defaultMessage: 'Leave a comment (optional)',
  },
  instructionsSubmit: {
    id: 'project.tasks.action.instructions.submit_task',
    defaultMessage: 'Submit your work',
  },
  comment: {
    id: 'project.tasks.action.comment.title',
    defaultMessage: 'Comment',
  },
  commentPlaceholder: {
    id: 'project.tasks.action.comment.input.placeholder',
    defaultMessage: 'Write a comment on this task',
  },
  editStatus: {
    id: 'project.tasks.action.selection.title',
    defaultMessage: 'Edit status',
  },
  badImagery: {
    id: 'project.tasks.action.options.bad_imagery',
    defaultMessage: "It wasn't possible to map due to bad imagery",
  },
  incomplete: {
    id: 'project.tasks.action.options.mapping_incomplete',
    defaultMessage: "I couldn't map everything",
  },
  completelyMapped: {
    id: 'project.tasks.action.options.mapping_complete',
    defaultMessage: "I completely mapped this task",
  },
  markAsValid: {
    id: 'project.tasks.action.options.validate',
    defaultMessage: "Validate and mark as finished",
  },
  markAsInvalid: {
    id: 'project.tasks.action.options.invalidate',
    defaultMessage: "More mapping is needed",
  },
  splitTask: {
    id: 'project.tasks.action.split_task',
    defaultMessage: "Split task",
  },
  selectAnotherTask: {
    id: 'project.tasks.action.select_another_task',
    defaultMessage: "Select another task",
  },
  submitTask: {
    id: 'project.tasks.action.submit_task',
    defaultMessage: "Submit task",
  },
});
