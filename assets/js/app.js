const $boardContainer = document.querySelector('.container');
const board = new Board();

function handleListCreate() {
  const listTitle = prompt('New list title') || '';
  if (listTitle.trim()) {
    board.addList(listTitle);
    renderBoard();
  }
}

function handleCardCreate(event) {
  const $listContainer = event.target.parentNode;
  const listId = Number($listContainer.getAttribute('data-id'));

  const cardText = prompt('New card text') || '';

  if (cardText.trim()) {
    board.addCard(listId, cardText);
    renderBoard();
  }
}

function handleCardEdit(event) {
  const cardId = Number(event.target.getAttribute('data-id'));

  const cardText = prompt('New card text') || '';

  if (cardText.trim()) {
    board.editCard(cardId, cardText);
    renderBoard();
  }
}

function renderBoard(){
  $boardContainer.innerHTML = '';

  board.lists.forEach(function(list, index){
      const $listContainer = document.createElement('div');
      $listContainer.className = 'list';
      $listContainer.setAttribute('data-id', list.id);


      const $header = document.createElement('header');

      const $headerBtn = document.createElement('button');
      $headerBtn.textContent = list.title;

      const $cardUl = document.createElement('ul');

      list.cards.forEach(function(card) {
        const $cardLi = document.createElement('li');

        const $cardBtn = document.createElement('button');
        $cardBtn.textContent = card.text;
        $cardBtn.setAttribute('data-id', card.id);
        $cardBtn.addEventListener('click', handleCardEdit);

        $cardLi.appendChild($cardBtn);
        $cardUl.appendChild($cardLi);
      });

      const $addCardBtn = document.createElement('button');
      $addCardBtn.textContent = 'Add a card...';
      $addCardBtn.addEventListener('click', handleCardCreate);

      $header.appendChild($headerBtn);
      $listContainer.appendChild($header);
      $listContainer.appendChild($cardUl);
      $listContainer.appendChild($addCardBtn);
      $boardContainer.appendChild($listContainer);
  });

  const $addListContainer = document.createElement('div');
  $addListContainer.className = 'list add';

  const $addListBtn = document.createElement('button');
  $addListBtn.textContent = '+ Add another list';
  $addListBtn.addEventListener('click', handleListCreate);

  $addListContainer.appendChild($addListBtn);
  $boardContainer.appendChild($addListContainer);
}

renderBoard();
