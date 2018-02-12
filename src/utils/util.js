export function toggleSideNav() {
    if ($('#sidenav-overlay').length > 0) {
        // side-nav is shown
        $('.button-collapse').sideNav('hide');
    } else {
        // side-nav is hidden
        $('.button-collapse').sideNav('show');
    }
}

export function closeSideNavIfOpen() {
    if ($('#sidenav-overlay').length > 0) {
        // side-nav is shown
        $('.button-collapse').sideNav('hide');
    }
}