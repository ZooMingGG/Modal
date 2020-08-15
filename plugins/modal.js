Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
};

$.modal = function(options) {
    const animationSpeed = 500;
    const defaultWidth = 600;

    let destroyed = false;

    const _createModalFooter = (buttons = []) => {
        if (buttons.length === 0) {
            return document.createElement('div');
        }

        const footerWrapper = document.createElement('div');
        footerWrapper.classList.add('modal-footer');

        buttons.forEach((button) => {
            const btn = document.createElement('button');
            btn.textContent = button.text;
            btn.classList.add('btn', `btn-${button.style || 'secondary'}`);
            btn.onclick = button.handler;

            footerWrapper.append(btn);
        });

        return footerWrapper; 
    };

    const _createModal = (options) => {
        const modal = document.createElement('div');
        modal.classList.add('modal-wrapper');
        modal.insertAdjacentHTML('afterbegin', `
            <div class="modal-overlay" data-modal-close="true">
                <div class="modal-window" style="width: ${options.width || defaultWidth}px;">
                    <div class="modal-header">
                        <span class="modal-title">${options.title || ''}</span>
                        ${options.closable ? `<span class="modal-close" data-modal-close="true">&times;</span>` : ''}
                    </div>
                    <div class="modal-body" data-content>
                        ${options.content || ''}
                    </div>
                </div>
            </div>
        `);

        const modalFooter = _createModalFooter(options.footerButtons);  
        modalFooter.appendAfter(modal.querySelector('[data-content]'));
    
        document.body.append(modal);
    
        return modal;
    };

    const modal = _createModal(options);

    const openTriggers = document.querySelectorAll(options.trigger);

    let closing = false;

    const modalInstance = {
        open() {
            if (destroyed) {
                return;
            }

            !closing && modal.classList.add('open');
        },
        close() {
            closing = true;
            modal.classList.remove('open');
            modal.classList.add('hide');
            setTimeout(() => {
                modal.classList.remove('hide');
                closing = false;
            }, animationSpeed);
        },
        setContent(content) {
            document.querySelector('[data-content]').innerHTML = content;
        },
        destroy() {
            destroyed = true;

            modal.remove();

            openTriggers.forEach((item) => {
                item.removeEventListener('click', this.open);
            });
        }
    };

    openTriggers.forEach((item) => {
        item.addEventListener('click', modalInstance.open);
    });

    if (options.closable) {
        document.querySelector('.modal-wrapper').addEventListener('click', (event) => {
            if (event.target.getAttribute('data-modal-close') === 'true') {
                modalInstance.close();
            }
        });
    }

    return modalInstance;
};