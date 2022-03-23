const run = () => {

    const launchDarklyUsers = () => {

        //LaunchDarkly not opened
        if(window.location.hostname.indexOf('launchdarkly') == -1) return;
    
        const removeButtons = () => {
            var btnsUsersPage = document.querySelectorAll("a[href='/default/production/users']");
            btnsUsersPage.forEach(btn => btn.remove());
        }
    
        // Remove Buttons immediately
        removeButtons();
    
        // Remove Buttons after page is loaded
        window.addEventListener("DOMContentLoaded", function() {
            removeButtons();
        });
    
        //Blocks manual navigation
        if(window.location.pathname.indexOf('default/production/users') != -1){
            window.location.replace("https://app.launchdarkly.com");
        }

    }

    //AC: As an Origin Employee I shouldn't be able to access the /users feature on LaunchDarkly
    launchDarklyUsers();
    
}