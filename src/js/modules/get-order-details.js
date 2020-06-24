var getOrderDetails = {
	$descriptionWrap: $('.order-details__description-wrap'),
	$commentWrap: $('.order-details__comment-wrap'),
	$filesWrap: $('.order-details__files-wrap'),
	$additionalWrap: $('.order-details__additional-work-wrap'),

	makeDescription: (dataDescription) => {
		if (dataDescription) {
			getOrderDetails.$descriptionWrap.find('.order-details__description').text(dataDescription);
		} else {
			getOrderDetails.$descriptionWrap.remove();
		}
	},

	makeComment: (dataComment) => {
		if (dataComment) {
			getOrderDetails.$commentWrap.find('.order-details__comment-text').text(dataComment);
		} else {
			getOrderDetails.$commentWrap.remove();
		}
	},

	makeAttachFiles: (filesArr) => {
		if (filesArr.length > 0) {
			const $filesContainer = getOrderDetails.$filesWrap.find('.order-details__files-wrap');
			const $fileExample = $filesContainer.find('.order-details__file-item').eq(0).clone();

			$filesContainer.empty();

			filesArr.forEach((current) => {
				const $fileElem = $fileExample.clone();

				$fileElem.find('.order-details__file-name').text(current['name']);
				$fileElem.find('.order-details__file-size').text(`(${current['size']})`);
				$fileElem.find('.order-details__file-link').attr('href', current['link']);

				$filesContainer.append($fileElem);
			});
		} else {
			getOrderDetails.$filesWrap.remove();
		}
	},

	makeAdditional: (additionalArr) => {
		if (additionalArr.length > 0) {
			const $container = getOrderDetails.$additionalWrap.find('.order-details__additionall-wrap');
			const $serviceItems = getOrderDetails.$additionalWrap.find('.service__more-row');
			const $serviceTemplate = $serviceItems.eq(0);

			$serviceItems.remove();

			additionalArr.forEach((current) => {
				const $service = $serviceTemplate.clone();
				const $description = $service.find('.service__content_more p');

				$service.find('.checkbox__service-name').text(current['name']);
				$service.find('.service__quantity').text(current['quantity']);
				$service.find('.service__more-cell_price').text(`${current['price']} ₽`);

				if (current['description']) {
					$description.text(current['description']);
				} else {
					$description.remove();
				}

				$container.append($service);
			});
		} else {
			getOrderDetails.$additionalWrap.remove();
		}
	},

	makeOrderDetails: (data) => {
		getOrderDetails.makeDescription(data['description']);
		getOrderDetails.makeComment(data['comment']);
		getOrderDetails.makeAttachFiles(data['files']);
		getOrderDetails.makeAdditional(data['additional']);
	}
};

export { getOrderDetails };
