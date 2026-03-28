/* =========================================================
   FLEET.JS — fleet.html only
   Handles: category filter tabs
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  var tabs  = document.querySelectorAll('.fleet-tab');
  var cards = document.querySelectorAll('.fleet-card');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Update active tab
      tabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      // Show/hide cards
      cards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          if (card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

});
