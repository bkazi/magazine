'use strict';

class ImageViewer {
	constructor(views, lightbox, lightboxContainer, options) {
		this.imageViews = Array.from(views);
		this.lightbox = lightbox;
		this.lightboxContainer = lightboxContainer;
		this.visibleClass = options.visibleClass;
		if (options.closeButton) {
			this.closeButton = options.closeButton;
		}

		this.onClick = this.onClick.bind(this);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.blockClicks = this.blockClicks.bind(this);
		this.update = this.update.bind(this);
		this.appear = this.appear.bind(this);

		this.currIdx = -1;
		this.lightboxImg = this.lightbox.getElementsByTagName('img')[0];
		this.lightboxP = this.lightbox.getElementsByTagName('p')[0];

		this.addEventListeners();
	}

	addEventListeners () {
		document.addEventListener('click', this.onClick);
		this.lightboxContainer.addEventListener('click', this.hide);
		this.lightbox.addEventListener('click', this.blockClicks);
		if (this.closeButton) this.closeButton.addEventListener('click', this.hide);
	}

	blockClicks (evt) {
		evt.stopPropagation();
	}

	show () {
		this.lightboxContainer.classList.add(this.visibleClass);
	}

	hide () {
		this.lightboxContainer.classList.remove(this.visibleClass);
	}

	onClick (evt) {
		if (evt.target.nodeName === 'IMG') {
			requestAnimationFrame(this.appear);
			this.currIdx = this.imageViews.indexOf(evt.target.parentNode);
			requestAnimationFrame(this.update);
		}
	}

	appear () {
		if (!this.lightboxContainer.classList.contains(this.visibleClass)) {
			this.show();
		}
	}

	update () {
		const currView = this.imageViews[this.currIdx];
		this.lightboxImg.src = currView.getElementsByTagName('img')[0].src;
		this.lightboxP.textContent = currView.getElementsByTagName('aside')[0].textContent;
	}
}