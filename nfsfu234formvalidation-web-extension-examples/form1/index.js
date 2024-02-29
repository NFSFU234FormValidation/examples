
document.addEventListener('DOMContentLoaded', ()=>{


    if ( localStorage.getItem("nfsfu234HasOpenedBefore") !== null )
    {

        const directionsContainer = document.querySelector('.directions-container');

        if ( directionsContainer )
        {

            directionsContainer.classList.add("hidden");

        }

    }
    else
    {
        localStorage.setItem("nfsfu234HasOpenedBefore", true);
    }

    document.querySelectorAll('.js-close').forEach( closeBtn => {

        closeBtn.addEventListener('click', ()=>{
    
            const nearestItem = closeBtn.closest('.js-container');
    
            nearestItem.classList.add('hidden');
    
        })
    
    } );

    const siteInfoBtn = document.getElementById("siteInfoBtn");

    if ( siteInfoBtn )
    {

        siteInfoBtn.addEventListener('click', ()=>{

            const container = document.querySelector(".site-info-container");

            if ( container.classList.contains('hidden') )
            {
                container.classList.remove("hidden");
            }

        });

    }

})