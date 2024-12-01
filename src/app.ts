import './assets/style.css';

async function taskCountsForSelectedCards() {
  miro.board.ui.on('selection:update', async (event) => {
    let selectedItems = event.items;
    let cards = selectedItems.filter(item => item.type === 'card');

    if (cards.length === 0) {
      miro.board.notifications.showInfo('(unselected)');
      return;
    }

    let uncheckedTasksCount = 0;
    let checkedTasksCount = 0;
    cards.forEach((card) => {
      const uncheckedTasks = card.description.match(/\<li data\-list\=\"unchecked\"/g) ?? [];
      uncheckedTasksCount += uncheckedTasks.length;
      const checkedTasks = card.description.match(/\<li data\-list\=\"checked\"/g) ?? [];
      checkedTasksCount += checkedTasks.length;
    });
    miro.board.notifications.showInfo(`Task: ${checkedTasksCount}/${uncheckedTasksCount + checkedTasksCount}`);
  });
}

taskCountsForSelectedCards();
