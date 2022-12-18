import { configure, makeAutoObservable } from 'mobx';

configure({ enforceActions: 'observed' });

export default class stateStore {
    constructor() {
        this.menuState = 'closed';
        this.applicationRoot = null;

        this.screenInfo = {
            width: 0,
            height: 0
        };

        this.siteInfo = {
            siteName: null,
            siteUrl: 'throughapinhole.com'
        };

        this.visiblePost = {
            postId: 1,
            postTitle: null,
            tags: [],
            tagNames: [],
            fullImageUrl: null,
            width: null,
            height: null
        };

        this.categoryList = [];
        this.currentCategoryPosts = [];
        this.currentCategoryData = {};
        this.pages = [];
        this.currentPageData = {};

        makeAutoObservable(this);
    }

    setMenuState = state => {
        this.menuState = state;
    }

    toggleMenuState = () => {
        this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    }

    setApplicationRoot = element => {
        this.applicationRoot = element;
    }

    setSiteName = name => {
        this.siteInfo.siteName = name;
    }

    setVisiblePost = (postId, postTitle) => {
        this.visiblePost.postId = postId;
        this.visiblePost.postTitle = postTitle;
    }

    setVisiblePostImage = fullImageUrl => {
        this.visiblePost.fullImageUrl = fullImageUrl;
    }

    setVisiblePostTags = tagNames => {
        tagNames.forEach(tagName => {
            this.visiblePost.tagNames.push(tagName);
        });
    }

    clearVisiblePostTagNames = () => {
        this.visiblePost.tagNames.clear();
    }

    setCategoryList = categories => {
        this.categoryList.length = 0;
        categories.forEach((category, index) => {
            this.categoryList[index] = category;
        })
    }

    setCategoryPosts = posts => {
        this.currentCategoryPosts.length = 0;
        posts.forEach((post, index) => {
            this.currentCategoryPosts[index] = post;
        })
    }

    setCategoryData = categoryData => {
        Object.keys(categoryData).forEach(property => {
            this.currentCategoryData[property] = categoryData[property];
        })
    }

    setThumbnailImageUrl = imageData => {
        this.currentCategoryPosts[imageData.post_index].thumbnail_image = imageData.image_url;
    }

    setCurrentPost = postData => {
        Object.keys(postData).forEach(property => {
            this.visiblePost[property] = postData[property];
        })
    }

    setPages = pageData => {
        pageData.forEach(page => {
            this.pages.push(page);
        });
    }

    setPageData = pageData => {
        Object.assign(this.currentPageData, pageData);
    }
}
