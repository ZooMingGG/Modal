const modal = $.modal({
    width: 600,
    title : 'My custom title',
    closable: true,
    content: `
        <span><b>Hello</b></span>
        <br>
        <span>This is custom content</span>
    `,
    trigger: '.open-modal',
    footerButtons: [
        {
            text: 'Ok',
            style: 'success',
            handler() {
                console.log('Ok button');
                modal.close();
            }
        },
        {
            text: 'Cancel',
            style: 'danger',
            handler() {
                console.log('Cancel button');
                modal.close();
            }
        }
    ]
});

document.querySelector('.set-content').addEventListener('click', () => {
    modal.setContent(document.querySelector('.modal-content').value);
});