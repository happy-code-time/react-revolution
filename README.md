# React Revolution

React Revolution is a light javascript library to generate interactive modules for react projects.

## Website: 

[https://react-revolution.j.pl/](https://react-revolution.j.pl/)

### Installation 
- npm i react-revolution
- yarn add react-revolution

### Desctructuring module import

```
import { Breadcrumbs } from 'react-revolution';
```

### Default module import

```
import Breadcrumbs from 'react-revolution/Breadcrumbs';
```

### Additional sass file import
```
// Global file
@import 'react-revolution/scss/react-revolution.scss';
// Single module file
@import 'react-revolution/scss/rr-breadcrumbs.scss';
```

### Additional compiled sass file import
```
// Global file
@import 'react-revolution/css/react-revolution.css';
// Single module file
@import 'react-revolution/css/rr-breadcrumbs.css';
```

### Example

```
import { Breadcrumbs } from 'react-revolution';

// or default import 
// import Breadcrumbs from 'react-revolution/Breadcrumbs';

<Breadcrumbs 
    hashRouter={true}
/>
```

### Available modules

    Accordion
    Articles
    ArticlesImages
    Astronaut404
    Boxes
    Breadcrumbs
    Cards
    CardsScroll
    CardsScrollCallback
    Carousel
    Clipboard
    Clouds404
    CloudsMountains404
    Container
    ContainerPopup
    ContainerSidebar
    CustomSuggestion
    DarkLines404
    DragDropArea
    DragDropList
    Filter
    FilterMapping
    FullScreenListArray
    FullScreenListObject
    FullScreenOverlay
    GlobalMessages
    Icons
    ImageBanner
    ImageBox
    ImageCarousel
    InputAnimation
    InputFile
    InputFileDragDrop
    InputSuggestionArray
    InputSuggestionObject
    Lightbulb404
    ListSwitch
    LoadingBoxTop
    LoadOnScroll
    Menu
    MenuDropDown
    MenuHeight
    MenuHoverX
    MenuHoverY
    Modal
    Overlay
    PagerDynamic
    PagerStatic
    Picture404
    Pills
    PopupBox
    PopupData
    PopupHover
    Preloader
    ReadMore
    ReadMoreCallback
    Ribbon
    RibbonMultiple
    ScrollTo
    SideBar
    Slider
    SliderCards
    SliderFullscreen
    SliderItems
    SourceCode
    Stars
    Steps
    StepsGenerator
    StepsGeneratorDragDrop
    Suggestions
    Table
    TextWriter
    Timeline
    Water404

### Available functions

    addGlobalMessage
    disableHtmlScroll
    enableHtmlScroll
    isArray
    isInViewport
    isObject
    scrollTopListener
    scrollToTop
    urlExtract
    uuid
    copyArray
    copyObject
    isBoolean
    isFunction
    isNumber
    isString