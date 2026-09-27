document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const hero = document.querySelector('.hero');
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    const syncHeader = () => {
        if (!header || !hero) return;
        const pastHero = window.scrollY > hero.offsetHeight - 80;
        header.classList.toggle('is-solid', pastHero || header.classList.contains('is-open'));
    };

    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();

    const closeMenu = () => {
        if (!header || !toggle) return;
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        document.body.classList.remove('nav-lock');
        syncHeader();
    };

    if (toggle && nav && header) {
        toggle.addEventListener('click', () => {
            const open = !header.classList.contains('is-open');
            header.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            document.body.classList.toggle('nav-lock', open);
            syncHeader();
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });
    }

    const tabs = Array.from(document.querySelectorAll('.case-tab'));
    const panels = Array.from(document.querySelectorAll('.stage'));

    const activate = (id) => {
        tabs.forEach((tab) => {
            const selected = tab.dataset.target === id;
            tab.classList.toggle('is-active', selected);
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((panel) => {
            const selected = panel.dataset.panel === id;
            panel.classList.toggle('is-active', selected);
            panel.hidden = !selected;
        });
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(tab.dataset.target));
        tab.addEventListener('keydown', (event) => {
            const next = event.key === 'ArrowDown' || event.key === 'ArrowRight';
            const prev = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
            if (!next && !prev) return;
            event.preventDefault();
            const target = tabs[(index + (next ? 1 : -1) + tabs.length) % tabs.length];
            target.focus();
            activate(target.dataset.target);
        });
    });

    const form = document.getElementById('contact-form');
    const alertBox = document.getElementById('form-alert');

    if (form && alertBox) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const button = form.querySelector('button[type="submit"]');
            const original = button.textContent;
            button.disabled = true;
            button.textContent = 'Enviando...';

            window.setTimeout(() => {
                button.disabled = false;
                button.textContent = original;
                alertBox.style.display = 'block';
                form.reset();
                window.setTimeout(() => {
                    alertBox.style.display = 'none';
                }, 7000);
            }, 700);
        });
    }
});
