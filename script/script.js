const form = document.querySelector('.add-comment-form');
const commentsList = document.querySelector('.comments-list');
const comments = []; // массив объектов комментариев

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const nameInput = document.getElementById('name-input');
	const commentInput = document.getElementById('comment-input');
	const dateInput = document.getElementById('date-input');
	const name = nameInput.value.trim();
	const commentText = commentInput.value.trim();
	const date = dateInput.value || new Date().toISOString().slice(0, 10);
	const commentId = `comment-${comments.length + 1}`;

	if (!name || !commentText) {
		alert('Пожалуйста, заполните все обязательные поля');
		return;
	}

	const comment = {
		id: commentId,
		author: name,
		text: commentText,
		date: date,
		likes: 0,
		isLiked: false,
	};

	comments.push(comment);

	const li = document.createElement('li');
	li.setAttribute('data-id', commentId);
	li.innerHTML = `
    <div class="comment">
      <div class="comment-header">
        <span class="comment-author">${name}</span>
        <span class="comment-date">${date}</span>
        <button class="like-comment-btn ${comment.isLiked ? 'liked' : ''}" title="Лайкнуть комментарий">
          <span class="material-symbols-outlined">thumb_up</span>
        </button>
        <span class="like-count">${comment.likes}</span>
        <button class="delete-comment-btn" title="Удалить комментарий">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div class="comment-body">${commentText}</div>
    </div>
  `;

	commentsList.appendChild(li);

	nameInput.value = '';
	commentInput.value = '';
	dateInput.value = '';
});

commentsList.addEventListener('click', (event) => {
	if (event.target.classList.contains('delete-comment-btn')) {
		const comment = event.target.closest('.comment');
		const commentId = comment.getAttribute('data-id');
		const commentIndex = comments.findIndex((c) => c.id === commentId);
		if (commentIndex >= 0) {
			comments.splice(commentIndex, 1);
			comment.remove();
		}
	} else if (event.target.classList.contains('like-comment-btn')) {
		const comment = event.target.closest('.comment');
		const commentId = comment.getAttribute('data-id');
		const commentIndex = comments.findIndex((c) => c.id === commentId);
		if (commentIndex >= 0) {
			const commentLikes = comments[commentIndex].likes;
			const isCommentLiked = comments[commentIndex].isLiked;
			if (!isCommentLiked) {
				comments[commentIndex].likes = commentLikes + 1;
				comments[commentIndex].isLiked = true;
			} else {
				comments[commentIndex].likes = commentLikes - 1;
				comments[commentIndex].isLiked = false;
			}
			const likeBtn = event.target;
			const likeCountEl = comment.querySelector('.like-count');
			const isCommentLikedClass = 'liked';
			likeBtn.classList.toggle(isCommentLikedClass);
			likeCountEl.textContent = comments[commentIndex].likes;
		}
	}
});