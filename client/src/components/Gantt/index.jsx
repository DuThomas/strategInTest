import React, { useEffect } from 'react';
import { gantt } from 'dhtmlx-gantt';

import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import "./gantt.css"

const GanttPage = () => {
  useEffect(() => {
    // Initialisation de la vue Gantt
    const ganttContainer = document.getElementById('gantt-container');
    gantt.init(ganttContainer);

    // Exemple de données de tâches
    const tasks = [
      { id: 1, text: 'Tâche 11', start_date: '01-01-2023', duration: 2 },
      { id: 2, text: 'Tâche 22', start_date: '03-01-2023', duration: 2 },
      { id: 3, text: 'Tâche 32', start_date: '04-01-2023', duration: 2 }
      // ... Ajoutez d'autres tâches ici
    ];

    // Événement pour capturer les actions
    gantt.attachEvent('onAfterTaskUpdate', (id, item) => {
      console.log('Tâche mise à jour:', item);
    });

    gantt.attachEvent('onAfterTaskAdd', (id, item) => {
      console.log('Nouvelle tâche ajoutée:', item);
    });

    gantt.attachEvent('onAfterTaskDelete', (id, item) => {
      console.log('Tâche supprimée:', item, item.start_date, item.text, item.duration);
    });

    // Affichage des tâches dans la vue Gantt
    gantt.parse({ data: tasks });
  }, []);

  return <div id="gantt-container" style={{ width: '100%', height: '500px' }} />;
};

export default GanttPage;