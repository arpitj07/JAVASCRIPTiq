window.onload = function() {
	const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
	var start = 0;
	var end = 6;
	var isLoadingMore = true;

	//Function for fetching data
	const dataFetch = async () => {
		return await fetch(API_BASE_URL).then((response) => response.json()).then((data) => {
			messages = Object.entries(data).slice(start, end);
			console.log(start, end);
			console.log(messages);
			messages.forEach((message) => createMessageElement(message));

			start = end;
			end = end + 6;
			if (end === 100) {
				parentNode.removeEventListener('scroll', handleScroll);
				isLoadingMore = false;
			}
		});
	};

	//Initial Load
	dataFetch();

	function handleScroll() {
		if (!isLoadingMore) return;
		let scrolling = this.scrollHeight - this.scrollTop - this.clientHeight;

		if (scrolling > 0) return;
		dataFetch();
	}

	var parentNode = document.getElementById('testimonial-container');
	parentNode.addEventListener('scroll', handleScroll);

	//Function for Creating BODY TAGS
	const createMessageElement = (message) => {
		const ptag = document.createElement('p');
		ptag.innerHTML = message[1].body;
		ptag.classList.add('testimonial');
		parentNode.appendChild(ptag);
	};
};
