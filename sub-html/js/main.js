function render(props){

    let codeBox = document.querySelector('#current-env');
    codeBox.innerHTML = `微应用qiankun`;

    return Promise.resolve();
}



(win => {
    win['pureHtml'] = {
        bootstrap: () => {
            console.log('pureHtml bootstraped');
            return Promise.resolve();
        },
        mount: (props) => {
            console.log('pureHtml mounted');
            console.log(props);
            
            return render(props);
        },
        unmount: () => {
            console.log('pureHtml unmounted');
            return Promise.resolve();
        }
    }
})(window)