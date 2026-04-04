/* jetskis.js — Nisswa Boat & Jet Ski Rentals */

/* ── Pricing tab switcher ─────────────────────────────────────── */
function switchPricing(tab, el) {
	document.querySelectorAll('.js-ptab').forEach(function(btn) {
		btn.classList.remove('on');
	});
	document.querySelectorAll('.js-prows').forEach(function(panel) {
		panel.classList.remove('on');
	});
	if (el) el.classList.add('on');
	var panel = document.getElementById('pricing-' + tab);
	if (panel) panel.classList.add('on');
}

/* ── Booking panel switcher ───────────────────────────────────── */
function setJetTab(tab) {
	var single = document.getElementById('jet-booking-single');
	var pair   = document.getElementById('jet-booking-pair');
	if (!single || !pair) return;
	if (tab === 'pair') {
		single.style.display = 'none';
		pair.style.display   = 'block';
	} else {
		single.style.display = 'block';
		pair.style.display   = 'none';
	}
	/* Sync pricing tabs to match booking selection */
	switchPricing(tab, null);
	document.querySelectorAll('.js-ptab').forEach(function(btn, i) {
		btn.classList.toggle('on', (tab === 'pair' ? i === 1 : i === 0));
	});
}

/* ── Init ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
	/* Activate first pricing tab by default */
	var firstPtab = document.querySelector('.js-ptab');
	if (firstPtab) firstPtab.classList.add('on');

	/* Smooth scroll for any in-page anchor links */
	document.querySelectorAll('a[href^="#"]').forEach(function(link) {
		link.addEventListener('click', function(e) {
			var target = document.querySelector(this.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
});
