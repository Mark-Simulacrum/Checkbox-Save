/* jshint browser:true */
(function (window, document, undefined) {
    window.onload = init;

    function updateHash() {
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        var hash = "#Data:";
        for (var i = 0; i < checkboxes.length; i++) {
            hash += checkboxes[i].getAttribute('id') + ",";
        }
        hash = hash.replace(/,$/, '');
        window.location.hash = hash;
        readHash();
    }

    function readHash() {
        var checkedData = window.location.hash.replace(/^#Data:/, "").split(",");
        
        if (checkedData.length === 0 || checkedData[0] === '') {
            console.warn('Empty data!');
            return;
        }
        
//        document.querySelector('select#what_to_show').value = 'show-checked';

        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].removeAttribute('checked');
            checkboxes[i].parentNode.classList.remove('checked');
        }

        for (i = 0; i < checkedData.length; i++) {
            var checkbox = document.getElementById(checkedData[i]);
            if (checkbox === undefined || checkbox === null) {
                console.error("Checked data contains invalid id: '" + checkedData[i] + "' which is the " + (i+1) + " element of page parameters.");
                continue;
            }
            checkbox.setAttribute('checked', true);
            checkbox.parentNode.classList.add('checked');
        }
    }

    function addClickListeners() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0 ; i < checkboxes.length ; i++) {
            checkboxes[i].addEventListener('click', updateHash, false);
        }
    }
    
    function listenSelectAddClass() {
        var select = document.querySelector('select#what_to_show');
        function updateVal() {
            document.querySelector('html').className = select.value;
        }
        updateVal();
        select.addEventListener('input', updateVal, false);
    }

    function idsToText() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0 ; i < checkboxes.length ; i++) {
            var id = checkboxes[i].getAttribute('id').replace(/^#/, '');
            checkboxes[i].outerHTML += '<label for=' + id + '>' + id + '</label>';
        }
    }

    function init() {
        readHash();
        updateHash();
        idsToText();
        addClickListeners();
        listenSelectAddClass();
    }
})(window, window.document);
