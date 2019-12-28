import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import ReactPlaceholder from 'react-placeholder';

import messages from './messages';
import { useFetch, useFetchIntervaled } from '../../hooks/UseFetch';
import { getTaskAction } from '../../utils/projectPermissions';
import { getRandomArrayItem } from '../../utils/random';
import { updateTasksStatus } from '../../utils/updateTasksStatus';
import { TasksMap } from './map.js';
import { TaskSelectionFooter } from './footer';
import { TaskList } from './taskList';
import { TasksMapLegend } from './legend';
import { ProjectInstructions } from './instructions';
import { ProjectHeader } from '../projectDetail/header';

const getRandomTaskByAction = (activities, taskAction) => {
  if (['validateATask', 'validateAnotherTask'].includes(taskAction)) {
    return getRandomArrayItem(
      activities.filter(
        task => ['MAPPED', 'BADIMAGERY'].includes(task.taskStatus)
      ).map(task => task.taskId)
    );
  }
  if (['mapATask', 'mapAnotherTask'].includes(taskAction)) {
    return getRandomArrayItem(
      activities.filter(
        task => ['READY', 'INVALIDATED'].includes(task.taskStatus)
      ).map(task => task.taskId)
    );
  }
}

export function TaskSelection({ project, type, loading }: Object) {
  const user = useSelector(state => state.auth.get('userDetails'));
  const [tasks, setTasks] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [selected, setSelectedTasks] = useState([]);
  const [randomTask, setRandomTask] = useState([]);
  const [taskAction, setTaskAction] = useState('mapATask');
  // these two fetches are needed to initialize the component
  const [tasksError, tasksLoading, initialTasks] = useFetch(
    `projects/${project.projectId}/tasks/`,
    project.projectId !== undefined
  );
  /* eslint-disable-next-line */
  const [tasksActivitiesError, tasksActivitiesLoading, initialActivities] = useFetch(
    `projects/${project.projectId}/activities/latest/`,
    project.projectId !== undefined
  );
  // get activities each 60 seconds
  /* eslint-disable-next-line */
  const [activitiesError, activities] = useFetchIntervaled(
    `projects/${project.projectId}/activities/latest/`,
    60000,
  );

  useEffect(() => {
    setActiveSection(user.mappingLevel === 'BEGINNER' ? 'instructions' : 'tasks');
    setTasks(initialTasks);
  }, [user.mappingLevel, initialTasks]);

  useEffect(() => {
    if (initialTasks && activities) {
      setTasks(updateTasksStatus(initialTasks, activities));
    }
  }, [initialTasks, activities]);

  useEffect(
    () => {
      if (!activities && initialActivities && initialActivities.activity) {
        setRandomTask([getRandomTaskByAction(initialActivities.activity, taskAction)]);
      }
      if (activities && activities.activity) {
        setRandomTask([getRandomTaskByAction(activities.activity, taskAction)]);
      }
    }, [activities, initialActivities, taskAction]
  );

  function selectTask(selection, status = null) {
    if (typeof selection === 'object') {
      setSelectedTasks(selection);
    } else {
      if (selected.includes(selection)) {
        setSelectedTasks([]);
        setTaskAction(getTaskAction(user, project, null));
      } else {
        setSelectedTasks([selection]);
        setTaskAction(getTaskAction(user, project, status));
      }
    }
  }

  return (
    <div>
      <div className="cf vh-minus-200-ns">
        <div className="w-100 w-50-ns fl pt3 overflow-y-scroll-ns vh-minus-200-ns h-100">
          <div className="pl4-ns pl2 pr2">
            <ReactPlaceholder
              showLoadingAnimation={true}
              rows={3}
              ready={typeof project.projectId === 'number' && project.projectId > 0}
            >
              <ProjectHeader project={project} />
              <div className="cf">
                <div className="cf ttu barlow-condensed f4 pv2 blue-dark">
                  <span
                    className={`mr4 pb2 pointer ${activeSection === 'tasks' && 'bb b--blue-dark'}`}
                    onClick={() => setActiveSection('tasks')}
                  >
                    <FormattedMessage {...messages.tasks} />
                  </span>
                  <span
                    className={`mr4 pb2 pointer ${activeSection === 'instructions' &&
                      'bb b--blue-dark'}`}
                    onClick={() => setActiveSection('instructions')}
                  >
                    <FormattedMessage {...messages.instructions} />
                  </span>
                </div>
                <div className="pt3">
                  {activeSection === 'tasks' ? (
                    <TaskList
                      project={project}
                      tasks={activities || initialActivities}
                      selectTask={selectTask}
                      selected={selected}
                    />
                  ) : (
                    <ProjectInstructions instructions={project.projectInfo && project.projectInfo.instructions} />
                  )}
                </div>
              </div>
            </ReactPlaceholder>
          </div>
        </div>
        <div className="w-100 w-50-ns fl h-100 relative">
          <ReactPlaceholder
            showLoadingAnimation={true}
            type={'media'}
            rows={26}
            delay={200}
            ready={!tasksLoading}
          >
            <TasksMap
              mapResults={tasks}
              projectId={project.projectId}
              error={tasksError}
              loading={tasksLoading}
              className="dib w-100 fl h-100-ns vh-75"
              selectTask={selectTask}
              selected={selected}
              taskBordersOnly={false}
            />
            <TasksMapLegend />
          </ReactPlaceholder>
        </div>
      </div>
      <div className="cf w-100 bt b--grey-light fixed bottom-0 left-0 z-5">
        <ReactPlaceholder
          showLoadingAnimation={true}
          rows={3}
          delay={500}
          ready={typeof project.projectId === 'number' && project.projectId > 0}
        >
          <TaskSelectionFooter
            defaultUserEditor={user ? user.defaultEditor : 'iD'}
            project={project}
            tasks={tasks}
            taskAction={taskAction}
            selectedTasks={selected.length && !taskAction.endsWith('AnotherTask') ? selected : randomTask}
          />
        </ReactPlaceholder>
      </div>
    </div>
  );
}
