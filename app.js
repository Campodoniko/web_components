document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value;
    commentInput.value = '';

    const template = document.getElementById('comment-template');
    const clone = document.importNode(template.content, true);
  
    const commentElement = clone.querySelector('comment-element');
    commentElement.setAttribute('text', commentText);

    const likeButton = clone.querySelector('.like-button');
    likeButton.addEventListener('click', function() {
        let likes = likeButton.getAttribute('data-likes') || 0;
        likes++;
        likeButton.setAttribute('data-likes', likes);
        likeButton.textContent = `Like (${likes})`;
    });

    const replyButton = clone.querySelector('.reply-button');
    replyButton.addEventListener('click', function() {
        const replyInput = document.createElement('input');
        replyInput.type = 'text';
        replyInput.placeholder = 'Write a reply.';
        replyButton.parentNode.appendChild(replyInput);
    });
  
    const deleteButton = clone.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        deleteButton.parentNode.remove();
    });
    
    document.getElementById('comment-list').appendChild(clone);
});




class CommentElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
        const commentContainer = document.createElement('div');
        commentContainer.setAttribute('class', 'comment');
        commentContainer.textContent = this.getAttribute('text');

        const textColor = this.getAttribute('text-color') || 'green';
        const fontSize = this.getAttribute('font-size') || '20px';

        const style = document.createElement('style');
        style.textContent = `
            .comment { 
                color: var(--text-color, ${textColor});
                font-size: var(--font-size, ${fontSize});
            }
        `;
        
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(commentContainer);
    }
}

customElements.define('comment-element', CommentElement);


  

