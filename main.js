const run = () => {

    const isLaunchdarklyUrl = () => window.location.hostname.indexOf('launchdarkly') !== -1;

    const launchDarklyUsers = () => {

        const removeButtons     = () => document.querySelectorAll('a[href=\'/default/production/users\']').forEach(btn => btn.remove());
        const isUrlUsersInProd  = () => window.location.pathname.indexOf('default/production/users') !== -1;
        const navigateToHome    = () => window.location.replace('https://app.launchdarkly.com');

        removeButtons();
    
        window.addEventListener("DOMContentLoaded", () => removeButtons());
    
        if(isUrlUsersInProd()) navigateToHome();

        //It shows when you click on a user profile inside an experiment
        setInterval(() => {

            const isUrlProd         = () => window.location.pathname.indexOf('default/production') !== -1;
            const modalUserDetails  = document.querySelector('div.DataList.UserPopover');
            const modalExists       = () => modalUserDetails !== null;

            if(isUrlProd() && modalExists()) modalUserDetails.remove();

        }, 1000);

        //Hiding the menu with email list
        setInterval(() => {

            const isUrlProd             = () => window.location.pathname.indexOf('default/production') !== -1;
            const isChangingExperiment  = () => window.location.pathname.indexOf('features') !== -1 && window.location.pathname.indexOf('targeting') !== -1;

            if(!isUrlProd() || !isChangingExperiment()) return;

            const filterDynamicFields   = Array.from(document.querySelectorAll(".css-wf3i3w-singleValue"));
            const isFilteringEmail      = () => filterDynamicFields.filter(element => element.innerHTML.indexOf('email') != -1).length > 0;
            const menuSelector          = document.querySelector('.css-1qlmf8c-menu');
            const isMenuSelector        = () => document.querySelector('.css-1qlmf8c-menu') !== null;
            const isMenuSelectionEmail  = () => isMenuSelector() ? menuSelector.innerHTML.indexOf('@') !== -1 : false;

            
                    if(isFilteringEmail() && isMenuSelectionEmail())  menuSelector.style.display = 'none';
            else    if(isMenuSelector())                              menuSelector.style.display = 'block';

        }, 1);

    }

    const launchDarklyRequestApprovals = () => { 

        setInterval(() => {

            const isUrlProd         = () => window.location.pathname.indexOf('default/production') !== -1;
            const btnAskApproval    = document.getElementById('approval-accordion');
            const isBtnVisible      = btnAskApproval !== null;
            const isBtnExpanded     = (isBtnVisible) ? btnAskApproval.getAttribute('aria-expanded') === 'true' : false;

            if(isUrlProd() && isBtnVisible && !isBtnExpanded) btnAskApproval.click();

        }, 1000);

    }

    const launchDarklyBranding = () => {

        try {

            const defaultLogo = document.getElementsByClassName("Topbar-logo")[0].getElementsByTagName('svg')[0];

            defaultLogo.remove();

            //Change navigation bar on top
            document.getElementsByClassName('Topbar')[0].style = "background: #16246a";

            //Change navigation pannel on the left
            document.querySelector('nav[aria-label="App navigation."]').style = 'background: #0c102a;';

            //Change navigation pannel items
            document.querySelectorAll('a[class="AppNav-item"]').forEach(elem => elem.style = 'background: transparent');

            //Change logo
            var base64_string = "PHN2ZyB3aWR0aD0iMjAwMCIgaGVpZ2h0PSI0NzEiIHZpZXdCb3g9IjAgMCAyMDAwIDQ3MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzJfMzU2KSI+CjxwYXRoIGQ9Ik05MjkuMjc2IDEwNC43MTdDOTI5LjI3NiA4OS41NzAxIDkzNi42NTYgODEuOTk2NSA5NTEuNDE2IDgxLjk5NjVIOTcyLjQ0NUM5ODcuNTkyIDgxLjk5NjUgOTk1LjE2NiA4OS41NzAxIDk5NS4xNjYgMTA0LjcxN1YxMzAuNzdDOTk1LjIyNSAxMzMuMjk4IDk5NS4xMzMgMTM1LjgyNyA5OTQuODg4IDEzOC4zNDRDOTk0LjczNiAxNDAuMzQ1IDk5NC40NTggMTQyLjMzNSA5OTQuMDU1IDE0NC4zMDJDOTkzLjcxMSAxNDYuMDY1IDk5My41NDEgMTQ3Ljg1NyA5OTMuNTUgMTQ5LjY1NEg5OTQuNjYxQzk5Ny4zODcgMTQwLjk0OCAxMDAxLjE5IDEzMi42MiAxMDA2IDEyNC44NjNDMTAxMSAxMTYuNjA0IDEwMTcuMDggMTA5LjA1NSAxMDI0LjEgMTAyLjQyQzEwMzAuOTYgOTUuODc2NiAxMDM4Ljc4IDkwLjQxOTcgMTA0Ny4zIDg2LjIzNzdDMTA1NS43OCA4Mi4wOTU4IDEwNjUuMSA3OS45Nzg1IDEwNzQuNTQgODAuMDUyN0MxMDgyLjExIDgwLjA1MjcgMTA4Ny40MSA4MS45MjA4IDEwOTAuNDkgODUuNjgyM0MxMDkzLjg5IDkwLjY3NzQgMTA5NS41IDk2LjY3MzEgMTA5NS4wNiAxMDIuNjk4VjEyMy43MDJDMTA5NS4wNiAxMzguODQ5IDEwODcuMzIgMTQ2LjQyMiAxMDcxLjg0IDE0Ni40MjJDMTA2MC4zIDE0Ni4xNzEgMTA0OC45MyAxNDkuMTYyIDEwMzkuMDIgMTU1LjA1NkMxMDI5LjY4IDE2MC44MDcgMTAyMS43NSAxNjguNTY5IDEwMTUuNzkgMTc3Ljc3N0MxMDA5LjQxIDE4Ny41MjUgMTAwNC42NyAxOTguMjUzIDEwMDEuNzUgMjA5LjUzNUM5OTguNjkyIDIyMS41NDcgOTk3LjE1NyAyMzMuODk3IDk5Ny4xODUgMjQ2LjI5MlYzMzQuODAyQzk5Ny4xODUgMzQ5Ljk0OSA5ODkuODA1IDM1Ny41MjMgOTc1LjA0NSAzNTcuNTIzSDk1MS4zMTVDOTM2LjU1NSAzNTcuNTIzIDkyOS4xNjYgMzQ5Ljk0OSA5MjkuMTQ5IDMzNC44MDJMOTI5LjI3NiAxMDQuNzE3WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMTE0Ny44IDEwNC43MTdDMTE0Ny44IDg5LjU2OTkgMTE1NS4xOCA4MS45OTYzIDExNjkuOTQgODEuOTk2M0gxMTkzLjY3QzEyMDguNDUgODEuOTk2MyAxMjE1LjgzIDg5LjU2OTkgMTIxNS44MyAxMDQuNzE3VjMzNC42NUMxMjE1LjgzIDM0OS43OTcgMTIwOC40NSAzNTcuMzcxIDExOTMuNjcgMzU3LjM3MUgxMTY5Ljk0QzExNTUuMTYgMzU3LjM3MSAxMTQ3Ljc4IDM0OS43OTcgMTE0Ny44IDMzNC42NVYxMDQuNzE3WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMTMwNi40OSA0MTQuNTI2QzEzMDguMzcgNDA4LjkgMTMxMi4zMiA0MDQuMjA0IDEzMTcuNTUgNDAxLjM5OUMxMzIzLjMzIDM5OS40MzcgMTMyOS42NCAzOTkuNzI1IDEzMzUuMjIgNDAyLjIwN0MxMzQyLjc5IDQwNS4wMTUgMTM1MC41NCA0MDcuMzI2IDEzNTguNDIgNDA5LjEyNEMxMzY5LjA1IDQxMS40NDcgMTM3OS45MSA0MTIuNTMxIDEzOTAuNzggNDEyLjM1NUMxNDAwLjg4IDQxMi40MDYgMTQxMC45NSA0MTEuMjQ1IDE0MjAuNzcgNDA4Ljg5N0MxNDI5Ljc2IDQwNi43ODYgMTQzOC4yMSA0MDIuODMyIDE0NDUuNTkgMzk3LjI4NEMxNDUyLjY5IDM5MS43MjQgMTQ1OC40MiAzODQuNjA3IDE0NjIuMzMgMzc2LjQ4MkMxNDY2Ljc1IDM2Ni42OTkgMTQ2OC44NiAzNTYuMDMzIDE0NjguNTEgMzQ1LjMwNFYzMjAuMDU5QzE0NjguNTIgMzE4LjU5NCAxNDY4LjcxIDMxNy4xMzYgMTQ2OS4wNyAzMTUuNzE2QzE0NjkuMDkgMzE0LjA4OCAxNDY5LjI3IDMxMi40NjUgMTQ2OS42IDMxMC44NjlIMTQ2OC41MUMxNDYxLjQ0IDMyMy4zOTMgMTQ1MS4yIDMzMy44NCAxNDM4LjgyIDM0MS4xNjRDMTQyNi42MSAzNDguMzg0IDE0MTEuMzEgMzUxLjk4NSAxMzkyLjkzIDM1MS45NjlDMTM3NC41MSAzNTIuMzQ4IDEzNTYuMjUgMzQ4LjU1OSAxMzM5LjUxIDM0MC44ODZDMTMyNC4zOSAzMzMuNzk4IDEzMTEuMDMgMzIzLjQ1MyAxMzAwLjM4IDMxMC41OTJDMTI4OS41NyAyOTcuNDM5IDEyODEuNDIgMjgyLjMxNiAxMjc2LjM3IDI2Ni4wNTlDMTI2NS41OCAyMzEuMjI0IDEyNjUuNDQgMTkzLjk1NiAxMjc1Ljk5IDE1OS4wNDVDMTI4MC44NCAxNDMuMTUgMTI4OC44MyAxMjguMzg2IDEyOTkuNDcgMTE1LjYyM0MxMzEwLjA4IDEwMy4wNTYgMTMyMy4zNSA5My4wMDE1IDEzMzguMzIgODYuMTg3MkMxMzU1LjMxIDc4LjY2NTQgMTM3My43NSA3NC45NzY1IDEzOTIuMzIgNzUuMzgyMkMxNDA1Ljk1IDc0Ljk1MDcgMTQxOS41MiA3Ny4yNTEyIDE0MzIuMjQgODIuMTQ4QzE0NDEuMTUgODUuNzQgMTQ0OS41MiA5MC41NTc3IDE0NTcuMSA5Ni40NjJDMTQ2My44NyAxMDIuNDM0IDE0NjkuNTQgMTA5LjU1MyAxNDczLjg0IDExNy40OTFIMTQ3NC45QzE0NzQuNyAxMTcuMjggMTQ3NC41NSAxMTcuMDI5IDE0NzQuNDUgMTE2Ljc1NUMxNDc0LjM2IDExNi40ODEgMTQ3NC4zMiAxMTYuMTkgMTQ3NC4zNCAxMTUuOTAxVjEwMC4xNzNDMTQ3NC4zMyA5Ny43MzcyIDE0NzQuODMgOTUuMzI2IDE0NzUuODEgOTMuMDk1M0MxNDc2Ljc5IDkwLjg2NDUgMTQ3OC4yMyA4OC44NjM4IDE0ODAuMDIgODcuMjIyMkMxNDg0LjU5IDgzLjMzMjkgMTQ5MC41IDgxLjM5MjcgMTQ5Ni40OCA4MS44MTk4SDE1MTQuNzFDMTUyOS40OSA4MS44MTk4IDE1MzYuODggODkuMzkzMyAxNTM2Ljg4IDEwNC41NFYzNDAuNDU3QzE1MzYuODggMzY0LjE4NyAxNTMyLjY3IDM4NC4yNDkgMTUyNC4yNSA0MDAuNjQxQzE1MTYuNCA0MTYuMjg2IDE1MDUuMTkgNDMwLjAwOCAxNDkxLjQ0IDQ0MC44MzJDMTQ3Ny43OSA0NTEuMzQ5IDE0NjIuMiA0NTkuMDcgMTQ0NS41NyA0NjMuNTUyQzE0MjguOTUgNDY4LjE0IDE0MTEuNzkgNDcwLjQ3NSAxMzk0LjU0IDQ3MC40OTVDMTM3OS41IDQ3MC41NDggMTM2NC40OSA0NjkuMTAyIDEzNDkuNzMgNDY2LjE3OEMxMzM3LjU1IDQ2My45MDEgMTMyNS42MiA0NjAuNDI2IDEzMTQuMTEgNDU1LjgwMkMxMzAwLjQ1IDQ1MC4wNDYgMTI5Ni40OSA0NDAuMzI3IDEzMDIuMjUgNDI2LjY0NEwxMzA2LjQ5IDQxNC41MjZaTTE0MDYuMzYgMjk0LjE4MkMxNDE0LjMzIDI5NC4xNzggMTQyMi4yNSAyOTIuOSAxNDI5LjgxIDI5MC4zOTZDMTQzNy42NyAyODcuODE5IDE0NDQuNzMgMjgzLjI3NCAxNDUwLjM0IDI3Ny4xOTJDMTQ1Ni43OCAyNjkuOTkyIDE0NjEuNjUgMjYxLjUzMyAxNDY0LjY1IDI1Mi4zNTFDMTQ2OC41NiAyMzkuODc3IDE0NzAuMzkgMjI2Ljg0NCAxNDcwLjA1IDIxMy43NzZDMTQ3MC40MSAyMDAuNTE3IDE0NjguNTggMTg3LjI4OSAxNDY0LjY1IDE3NC42MjFDMTQ2MS42OSAxNjUuNDQ5IDE0NTYuNyAxNTcuMDYyIDE0NTAuMDYgMTUwLjA4M0MxNDQ0LjE3IDE0NC4wOTYgMTQzNi44MyAxMzkuNzQ1IDE0MjguNzUgMTM3LjQ2QzE0MjAuNDEgMTM1LjA4MSAxNDExLjc3IDEzMy45MDggMTQwMy4xIDEzMy45NzZDMTM4MS40OSAxMzMuOTc2IDEzNjUuMTMgMTQwLjkxIDEzNTQgMTU0Ljc3OEMxMzQyLjg4IDE2OC42NDYgMTMzNy4zIDE4Ni44OTkgMTMzNy4yNiAyMDkuNTM1QzEzMzcuMjYgMjM0LjM3NiAxMzQzLjE1IDI1NC43MDcgMTM1NC45MyAyNzAuNTI4QzEzNjYuNzIgMjg2LjM0OCAxMzgzLjg2IDI5NC4yMzMgMTQwNi4zNiAyOTQuMTgyVjI5NC4xODJaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIGQ9Ik0xNjA0Ljk2IDEwNC43MTdDMTYwNC45NiA4OS41Njk5IDE2MTIuMzQgODEuOTk2MyAxNjI3LjEgODEuOTk2M0gxNjUwLjgxQzE2NjUuNTcgODEuOTk2MyAxNjcyLjk1IDg5LjU2OTkgMTY3Mi45NSAxMDQuNzE3VjMzNC42NUMxNjcyLjk1IDM0OS43OTcgMTY2NS41NyAzNTcuMzcxIDE2NTAuODEgMzU3LjM3MUgxNjI3LjA4QzE2MTIuMyAzNTcuMzcxIDE2MDQuOTIgMzQ5Ljc5NyAxNjA0Ljk0IDMzNC42NUwxNjA0Ljk2IDEwNC43MTdaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIGQ9Ik0xNzQwLjkxIDEwNC43MTdDMTc0MC45MSA4OS41Njk5IDE3NDguMjkgODEuOTk2MyAxNzYzLjA1IDgxLjk5NjNIMTc4NC4xQzE3OTguODUgODEuOTk2MyAxODA2LjIzIDg5LjU2OTkgMTgwNi4yNCAxMDQuNzE3VjEyMS40NTVDMTgwNi4yNCAxMjMuMDc0IDE4MDYuMTUgMTI0LjY5MiAxODA1Ljk3IDEyNi4zMDJDMTgwNS43NyAxMjcuNTU1IDE4MDUuNjggMTI4LjgyMSAxODA1LjY5IDEzMC4wODhDMTgwNS4zNiAxMzEuMzI1IDE4MDUuMTggMTMyLjU5NiAxODA1LjE2IDEzMy44NzVIMTgwNi4yNEMxODA5Ljc0IDEyNy4xNzcgMTgxMy44OSAxMjAuODQzIDE4MTguNjQgMTE0Ljk2N0MxODI0LjQzIDEwNy44MTIgMTgzMS4xNCAxMDEuNDYyIDE4MzguNjEgOTYuMDgzMUMxODQ3LjI0IDg5Ljk1NjEgMTg1Ni42OSA4NS4wNjIgMTg2Ni42OCA4MS41NDE5QzE4NzguNjQgNzcuMzc0NyAxODkxLjI1IDc1LjM1NzYgMTkwMy45MiA3NS41ODRDMTkzNC41IDc1LjU4NCAxOTU4LjE2IDgzLjg2NDUgMTk3NC45MSAxMDAuNDI1QzE5OTEuNjUgMTE2Ljk4NiAyMDAwLjAyIDE0My41NTMgMjAwMCAxODAuMTI0VjMzNC40NzRDMjAwMCAzNDkuNjIxIDE5OTIuNDMgMzU3LjE5NCAxOTc3LjI4IDM1Ny4xOTRIMTk1NC4wNUMxOTM4LjkxIDM1Ny4xOTQgMTkzMS4zMyAzNDkuNjIxIDE5MzEuMzMgMzM0LjQ3NFYxOTQuMzg4QzE5MzEuMzMgMTc3LjU1OCAxOTI4LjQ2IDE2My45NzYgMTkyMi43MiAxNTMuNjQyQzE5MTYuOTkgMTQzLjMwOCAxOTA1LjQzIDEzOC4xNzUgMTg4OC4wNiAxMzguMjQzQzE4NzYuNzQgMTM4LjA0MiAxODY1LjUyIDE0MC40MTYgMTg1NS4yNCAxNDUuMTg1QzE4NDUuNjUgMTQ5Ljc0OSAxODM3LjE4IDE1Ni4zNjggMTgzMC40MyAxNjQuNTczQzE4MjMuNDEgMTczLjE2NiAxODE4IDE4Mi45NTkgMTgxNC40NyAxOTMuNDc5QzE4MTAuNjggMjA0LjYzOCAxODA4Ljc4IDIxNi4zNTQgMTgwOC44NCAyMjguMTQxVjMzNC40NDhDMTgwOC44NCAzNDkuNTk1IDE4MDEuNDUgMzU3LjE2OSAxNzg2LjY4IDM1Ny4xNjlIMTc2Mi45NUMxNzQ4LjE5IDM1Ny4xNjkgMTc0MC44MSAzNDkuNTk1IDE3NDAuODEgMzM0LjQ0OEwxNzQwLjkxIDEwNC43MTdaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIGQ9Ik01NjYuNDI2IDIxOC40NDdDNTY2LjI1MyAxOTguNDcgNTcwLjMwNSAxNzguNjgzIDU3OC4zMTcgMTYwLjM4M0M1ODUuODUxIDE0My4xMzQgNTk2Ljg3IDEyNy42MjggNjEwLjY4MSAxMTQuODRDNjI0LjY5MyAxMDIuMDUyIDY0MC45NTcgOTEuOTc3MSA2NTguNjQ3IDg1LjEyNjlDNjk2LjU0NiA3MC43NjIxIDczOC4zOTEgNzAuNzYyMSA3NzYuMjkgODUuMTI2OUM3OTQuMDc3IDkxLjk5NDEgODEwLjQ1NSAxMDIuMDY1IDgyNC42MDkgMTE0Ljg0QzgzOC41MjUgMTI3LjU5IDg0OS42MDMgMTQzLjEyNCA4NTcuMTI1IDE2MC40MzNDODY0Ljk1OCAxNzguODIgODY4Ljk5NiAxOTguNiA4NjguOTk2IDIxOC41ODZDODY4Ljk5NiAyMzguNTcxIDg2NC45NTggMjU4LjM1MSA4NTcuMTI1IDI3Ni43MzhDODQ5LjQ4NCAyOTQuMDE5IDgzOC4zNzQgMzA5LjU0NyA4MjQuNDgzIDMyMi4zNTZDODEwLjQyMyAzMzUuMjUxIDc5NC4wMiAzNDUuMzI5IDc3Ni4xNjQgMzUyLjA0NEM3MzguMjEgMzY2LjEwNSA2OTYuNDc1IDM2Ni4xMDUgNjU4LjUyMSAzNTIuMDQ0QzY0MC43NTEgMzQ1LjM2NiA2MjQuNDU4IDMzNS4yODEgNjEwLjU1NSAzMjIuMzU2QzU5Ni4zNDEgMzA5LjA2OCA1ODUuMDYyIDI5Mi45NTYgNTc3LjQ0MSAyNzUuMDUzQzU2OS44MTkgMjU3LjE1IDU2Ni4wMjUgMjM3Ljg1MiA1NjYuMyAyMTguMzk2TDU2Ni40MjYgMjE4LjQ0N1pNNjM2LjA1MyAyMTguNDQ3QzYzNS44ODMgMjMwLjQ1OSA2MzguMDk3IDI0Mi4zODYgNjQyLjU2NiAyNTMuNTM4QzY0Ni42NDIgMjYzLjU5OSA2NTIuNjQ1IDI3Mi43NjYgNjYwLjIzOCAyODAuNTI1QzY2Ny41NzkgMjg4LjA2NyA2NzYuMzg1IDI5NC4wMjkgNjg2LjExNCAyOTguMDQ1QzY5Ni4wNjIgMzAyLjI1IDcwNi43NDcgMzA0LjQzMyA3MTcuNTQ4IDMwNC40NjdDNzI4LjM0OCAzMDQuNTAxIDczOS4wNDcgMzAyLjM4NSA3NDkuMDIxIDI5OC4yNDNDNzU4Ljk5NiAyOTQuMTAxIDc2OC4wNDYgMjg4LjAxNCA3NzUuNjQ0IDI4MC4zMzlDNzgzLjI0MyAyNzIuNjY0IDc4OS4yMzggMjYzLjU1MyA3OTMuMjggMjUzLjUzOEM4MDEuODk3IDIzMS4wOTQgODAxLjg5NyAyMDYuMjU0IDc5My4yOCAxODMuODFDNzg5LjIwNCAxNzMuODE4IDc4My4xOTQgMTY0LjcyOSA3NzUuNTk1IDE1Ny4wNjVDNzY3Ljk5NiAxNDkuNDAxIDc1OC45NTkgMTQzLjMxNCA3NDkuMDAxIDEzOS4xNTNDNzM5LjA0NCAxMzQuOTkyIDcyOC4zNjIgMTMyLjgzOCA3MTcuNTcgMTMyLjgxNkM3MDYuNzc4IDEzMi43OTQgNjk2LjA4OCAxMzQuOTA1IDY4Ni4xMTQgMTM5LjAyNUM2NzYuMzczIDE0My4wODggNjY3LjU2NyAxNDkuMTAyIDY2MC4yMzggMTU2LjY5N0M2NTIuNjE0IDE2NC41MjcgNjQ2LjYwOSAxNzMuNzgzIDY0Mi41NjYgMTgzLjkzN0M2MzguMjI3IDE5NC45MTkgNjM2LjA1OCAyMDYuNjM5IDYzNi4xNzkgMjE4LjQ0N0g2MzYuMDUzWiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMjgyLjc0NiAxNzkuMjQxQzI5MC45MjYgMjAwLjUzOCAyOTAuOTI2IDIyNC4xMTEgMjgyLjc0NiAyNDUuNDA5VjI0NS4yNTdDMjc4LjkxNyAyNTQuNzQ0IDI3My4yMzggMjYzLjM3NCAyNjYuMDQxIDI3MC42NDRDMjU4Ljg0MyAyNzcuOTE0IDI1MC4yNzEgMjgzLjY3OSAyNDAuODIzIDI4Ny42MDNDMjMxLjM3NSAyOTEuNTI3IDIyMS4yNDEgMjkzLjUzMSAyMTEuMDEgMjkzLjQ5OUMyMDAuNzggMjkzLjQ2NyAxOTAuNjU4IDI5MS4zOTkgMTgxLjIzNSAyODcuNDE3QzE3MS45NjQgMjgzLjY0NCAxNjMuNTU1IDI3OC4wMjcgMTU2LjUyIDI3MC45MDZDMTQ5LjQwMSAyNjMuNTE2IDE0My43NTUgMjU0LjgzNyAxMzkuODg0IDI0NS4zMzNDMTMxLjcwNCAyMjQuMDI3IDEzMS43MDQgMjAwLjQ0NiAxMzkuODg0IDE3OS4xNEMxNDMuNjgzIDE2OS41MjQgMTQ5LjMzNiAxNjAuNzQ5IDE1Ni41MiAxNTMuMzE0QzE2My40OCAxNDYuMTUzIDE3MS44MyAxNDAuNDkyIDE4MS4wNTkgMTM2LjY3N0MxOTAuMzU2IDEzMi43MjMgMjAwLjM0MyAxMzAuNjQyIDIxMC40NDYgMTMwLjU1M0MyMjAuNTQ5IDEzMC40NjQgMjMwLjU3MSAxMzIuMzY5IDIzOS45MzcgMTM2LjE1OEMyNDkuMzAzIDEzOS45NDggMjU3LjgyOSAxNDUuNTQ4IDI2NS4wMjggMTUyLjYzN0MyNzIuMjI2IDE1OS43MjcgMjc3Ljk1NiAxNjguMTY3IDI4MS44ODggMTc3LjQ3NEMyODIuMTY2IDE3OC4wNTQgMjgyLjM5MyAxNzguNjg1IDI4Mi43NDYgMTc5LjI0MVoiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZD0iTTMyMy41NDIgNC42NjcyOGUtMDVIMTA2LjQzNEM5Mi41NTM5IC0wLjA5OTc1OTcgNzguNzkwNCAyLjUzNTc1IDY1LjkyOTMgNy43NTYwNUM1My4wNjgyIDEyLjk3NjQgNDEuMzYxNSAyMC42NzkyIDMxLjQ3NzggMzAuNDI0NUMyMS41OTQxIDQwLjE2OTkgMTMuNzI3MSA1MS43NjY5IDguMzI2MDMgNjQuNTUzMkMyLjkyNTAxIDc3LjMzOTQgMC4wOTU4MDExIDkxLjA2NDUgMCAxMDQuOTQ0TDAgMzE5LjI1MUMwLjIxMzUwNiAzNDcuMjU2IDExLjUzNTEgMzc0LjAzMiAzMS40Nzc2IDM5My42OTVDNTEuNDIwMSA0MTMuMzU4IDc4LjM1MjQgNDI0LjMwMSAxMDYuMzU4IDQyNC4xMTlIMzIzLjQ2N0MzNTEuNDkgNDI0LjI5NCAzNzguNDM2IDQxMy4zMzYgMzk4LjM4NCAzOTMuNjUzQzQxOC4zMzIgMzczLjk3IDQyOS42NSAzNDcuMTczIDQyOS44NSAzMTkuMTVWMTA0Ljk0NEM0MjkuNjU2IDc2LjkzNDYgNDE4LjM1MSA1MC4xNDc1IDM5OC40MTcgMzAuNDY5NEMzNzguNDgzIDEwLjc5MTMgMzUxLjU1MiAtMC4xNjc5MDggMzIzLjU0MiA0LjY2NzI4ZS0wNVY0LjY2NzI4ZS0wNVpNMzcxLjUwOCAxMTEuNTg0QzM3MS41MDggMTE0LjYzMyAzNzAuMjk5IDExNy41NTcgMzY4LjE0NSAxMTkuNzE1QzM2NS45OTIgMTIxLjg3MyAzNjMuMDcgMTIzLjA4OSAzNjAuMDIyIDEyMy4wOTZIMzIxLjY0OUMzMzAuNzI2IDEzMy4yMjcgMzM4LjEzMiAxNDQuNzQgMzQzLjU4NyAxNTcuMjAyQzM1MS4wMDggMTc0LjYyMyAzNTQuODMzIDE5My4zNjQgMzU0LjgzMyAyMTIuM0MzNTQuODMzIDIzMS4yMzUgMzUxLjAwOCAyNDkuOTc2IDM0My41ODcgMjY3LjM5N0MzMzYuMyAyODMuNzM5IDMyNS43NDEgMjk4LjQxNCAzMTIuNTYxIDMxMC41MTZDMjk5LjI0IDMyMi43NDYgMjgzLjY5MyAzMzIuMzAyIDI2Ni43NjYgMzM4LjY2NEMyNDguOTYxIDM0NS4zNjIgMjMwLjA3MiAzNDguNzA4IDIxMS4wNSAzNDguNTM1TDcwLjA4MDcgMzQ3LjM5OUM2Ny4wMjc1IDM0Ny4zOTkgNjQuMDk5NSAzNDYuMTg2IDYxLjk0MDYgMzQ0LjAyN0M1OS43ODE3IDM0MS44NjkgNTguNTY4OSAzMzguOTQxIDU4LjU2ODkgMzM1Ljg4N1YzMTEuNTc2QzU4LjU2ODggMzEwLjA2OCA1OC44NjcxIDMwOC41NzUgNTkuNDQ2NiAzMDcuMTgyQzYwLjAyNiAzMDUuNzkgNjAuODc1MiAzMDQuNTI2IDYxLjk0NTEgMzAzLjQ2M0M2My4wMTUxIDMwMi40IDY0LjI4NDggMzAxLjU1OSA2NS42ODEgMzAwLjk4OUM2Ny4wNzcyIDMwMC40MTkgNjguNTcyNSAzMDAuMTMgNzAuMDgwNyAzMDAuMTRIOTkuOTQ1N0M5MS40NjkyIDI5MC4yNTggODQuNDYzIDI3OS4yMDUgNzkuMTQzNyAyNjcuMzIxQzcxLjcyMiAyNDkuODk2IDY3Ljg5NjUgMjMxLjE1MSA2Ny44OTY1IDIxMi4yMTFDNjcuODk2NSAxOTMuMjcxIDcxLjcyMiAxNzQuNTI2IDc5LjE0MzcgMTU3LjEwMUM4Ni4yNjUzIDE0MC43MjYgOTYuNzEwMiAxMjYuMDA5IDEwOS44MTcgMTEzLjg4MUMxMjMuMTA5IDEwMS43NzcgMTM4LjU0NiA5Mi4yNjQ5IDE1NS4zMzQgODUuODMzN0MxNzMuMDQ5IDc5LjAxMTQgMTkxLjg5IDc1LjU4NTcgMjEwLjg3MyA3NS43MzU2SDM1OS44MkMzNjEuMzMgNzUuNzM1NiAzNjIuODI2IDc2LjAzMzYgMzY0LjIyMSA3Ni42MTI0QzM2NS42MTcgNzcuMTkxMiAzNjYuODg0IDc4LjAzOTYgMzY3Ljk1MSA3OS4xMDg5QzM2OS4wMTggODAuMTc4MiAzNjkuODYzIDgxLjQ0NzQgMzcwLjQzOSA4Mi44NDRDMzcxLjAxNSA4NC4yNDA1IDM3MS4zMSA4NS43MzY5IDM3MS4zMDYgODcuMjQ3NUwzNzEuNTA4IDExMS41ODRaIiBmaWxsPSIjMjMxRjIwIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMl8zNTYiPgo8cmVjdCB3aWR0aD0iMjAwMCIgaGVpZ2h0PSI0NzAuMzY4IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
            var img = document.createElement("img");
            img.style = "width: 100px; margin-top: 8px; filter: invert(99%) sepia(2%) saturate(156%) hue-rotate(111deg) brightness(114%) contrast(100%);";
            img.src = "data:image/svg+xml;base64," + base64_string;
            var preview = document.getElementsByClassName("Topbar-logo")[0];
            preview.appendChild(img);

        } catch(e){}

    }

    if(isLaunchdarklyUrl()) {

        //Branding personalisation
        launchDarklyBranding();

        //AC: Origin employees by default shouldn't be able to access the /users feature on LaunchDarkly
        launchDarklyUsers();

        //AC: Every change in a production experiment needs review
        launchDarklyRequestApprovals();

    }
    
}