'use strict';

const articleView = {};

articleView.populateFilters = function() {
    $('article').each(function() {
        let authorName, category, optionTag;
        if (!$(this).hasClass('template')) {
            authorName = $(this).attr('data-author');

            optionTag = `<option value=${authorName}>${authorName}</option>`;

            if ($(`#author-filter option[value=${authorName}]`.length === 0)) {
                $('#author-filter').append(optionTag);
            }

            category = $(this).attr('data-category');

            optionTag = `<option value=${category}>${category}</option>`;

            if ($(`#category-filter option[value=${category}]`.length === 0)) {
                $('#category-filter').append(optionTag);
                //still has repeats in menu
            }
        }
    });
};

articleView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('#articles').hide();
            $(`#articles[name=${this.author}]`).show();
            // TODO: If the <select> menu was changed to an option that has a value, we first need to hide all the articles, and then show just the ones that match for the author that was selected.
            // Use an "attribute selector" to find those articles, and fade them in for the reader.

        } else {
            $('#articles.draft').show();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
        if ($(this).val()) {
            $('#articles').hide();
            $(`#articles[category=${this.category}]`).show(); //does not work

        } else {
            $('#articles.draft').show();
        }
        $('#author-filter').val('');
    });

    // TODO: Just like we do for #author-filter above, we should handle change events on the #category-filter element.
    // When an option with a value is selected, hide all the articles, then reveal the matches.
    // When the blank (default) option is selected, show all the articles, except for the template.
    // Be sure to reset the #author-filter while you are at it!

};

articleView.handleMainNav = function() {
    // TODO: Add an event handler to .main-nav elements that will power the Tabs feature.
    // Clicking any .tab element should hide all the .tab-content sections, and then reveal the single .tab-content section that is associated with the clicked .tab element.
    // So: You need to dynamically build a selector string with the correct ID, based on the data available to you on the .tab element that was clicked.
    const clickedTabData = $(this).attr('data-content');//not working
    console.log(`${clickedTabData} was clicked!`);//not working
    // $('.tab-content').hide();
    // $(`section#${clickedTabData}`).show();
    
    // REVIEW: Now trigger a click on the first .tab element, to set up the page.
    $('.main-nav .tab:first').click();
};
$('.tab').click(articleView.handleMainNav());

articleView.setTeasers = function() {
    // REVIEW: Hide elements beyond the first 2 in any article body.
    $('.article-body *:nth-of-type(n+2)').hide();

    // TODO: Add an event handler to reveal all the hidden elements, when the .read-on link is clicked. You can go ahead and hide the "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
    // Ideally, we'd attach this as just one event handler on the #articles section, and let it process (in other words... delegate) any .read-on clicks that happen within child nodes.
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.

$(document).ready(function() {
    articleView.populateFilters();
    articleView.handleAuthorFilter();
    articleView.handleCategoryFilter();
});
