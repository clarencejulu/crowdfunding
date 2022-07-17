# Crowdfunding Product Page Project

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- Make a selection of which pledge to make
- Make pledges with just numbers (integers)
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one 
- See the number of items left decrease by 1 and also show if that item is out of stock
- Toggle whether or not the product is bookmarked and store the status
- Store all necessary information in a JSON file

### Screenshot

- Desktop Images
  - [Design](/design/desktop-design.jpg)
  - [Modal Selected](/design/desktop-design-modal-selected.jpg)
  - [Modal Completed](/design/desktop-design-modal-completed.jpg)

- Mobile Images
  - [Design](/design/mobile-design.jpg)
  - [Modal Selected](/design/mobile-design-modal-selected.jpg)
  - [Mobile Menu](/design/mobile-menu.jpg)

### Links

- [Repository](https://github.com/clarencejulu/crowdfunding)
- [Live Site](https://clarencejulu.github.io/crowdfunding)

## My process

### Built with

- HTML
- CSS custom properties
- Flexbox
- CSS Grid
- SASS - CSS Preprocessor
- Media Queries for Responsiveness
- [React](https://reactjs.org/) - JS library
- [Redux ToolKit](https://redux-toolkit.js.org/) - State Management
- Local Storage API
- [JSON Server](https://www.npmjs.com/package/json-server)
- Fetch API

### What I learned

1. Redux Toolkit - This was my first time using the redux toolkit so I got to make use of the `configureStore` and `createSlice` functions as well as the `useSelector` and `useDispatch` hook.

2. CSS Grid - I made use of grid-template-areas to change the position of certain elements when screen size was changed. This was my first time using this technique and it was nice to implement. 

    <u>Large Screen</u>
    ```css
    .box-content{
      display: grid;
      grid-template-areas: 
      'circle heading heading . amount-left'
      'circle description description description description';
    }
    ```
    <u>Small Screen</u>
    ```css
    .box-content{
      grid-template-areas: 
        'circle heading heading heading'
        'description description description description'
        'amount-left . . .';
      grid-template-columns: 2.5rem 1fr 1fr 1fr;
    }
    ```
3. stopPropagation() - I used this to stop event bubbling after moving the focus of the cursor into the `input` element in the RewardBoxModal component.
    ```js
      const toMakeInputActive = (event) => {
      event.stopPropagation();
      dispatch(makeInputActive({id: pledgeButtonId, inputId: inputId}));
    }
    ```
4. scrollIntoView() - The code below allowed me to scroll the page after I click on 'Select Reward'. It would take me to the corresponding id area.
    ```js
    if(fromModal){ document.getElementById(id).scrollIntoView(); }
    ```

5. PATCH - I made use of the Patch request to update JSON.
    ```js
    const setRemainingResponse = await fetch(remainingLink + id, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({"remaining": remaining === null ? null : remaining - 1}),
      });
    await setRemainingResponse.json();
    ```
6. Local Storage in REACT - Using localstorage in react, i had to make use of the `useEffect` and `useState` hooks.
    ```js
    const [isBookmarked, setisBookmarked] = useState(localStorage.getItem('bookmarkStatus') === 'true');

    useEffect(()=> {
        localStorage.setItem('bookmarkStatus', JSON.stringify(isBookmarked));
    }, [isBookmarked])
    ```
7. removeEventListener() - For anything that is not a built-in React element-based event listener, I'd  need to do extra work for the setup and for the cleanup.
    ```js
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 596px)").matches);

    useEffect(()=>{
      const mediaWatcher = window.matchMedia("(max-width: 596px)");   
      function updateIsSmallScreen(event){
        setIsSmallScreen(event.matches); 
      }
      mediaWatcher.addEventListener('change',   updateIsSmallScreen);

      return function cleanup(){        mediaWatcher.removeEventListener('change', updateIsSmallScreen);
      }
    })
    ```

### Continued development
After making use of the PATCH request, I want to do more projects that may require me to POST, PUT and DELETE.  
I'd also use CSS Grid more often as I had neglected it. This project made me realise that it's a great tool for making responsive web applications.

### Useful resources

- [Redux ToolKit](https://redux-toolkit.js.org/tutorials/quick-start) - This tutorial introduced me to Redux Toolkit and taught me how to start using it correctly.

## Author

- Frontend Mentor - [@clarencejulu](https://www.frontendmentor.io/profile/clarencejulu)
- Github - [My Github](https://github.com/clarencejulu)
- Website - []()
- Twitter - []()
- LinkedIn - [My LinkedIn Profile](https://www.linkedin.com/in/clarence-onumajulu/)
- Indeed - []()

## Acknowledgments

Big Thank You to my guy Hyeladi. He showed me `JSON Server` which is a way frontend developers could use a backend.

