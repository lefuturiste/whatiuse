<template>
  <div id="app">
    <scale-transition>
    <div v-show="show">
      <div class="header-container">
        <div class="header-content container">
          <div class="header-title-container">
            <h1 class="header-title">What I use ?</h1>
            <h2 class="header-description">List of all tools, platforms, technologies, languages which I use, sorted by categories.</h2>
          </div>
          <div class="header-socials">
            <ul class="socials">
              <li><a href="https://lefuturiste.fr" title="My website"><i class="fas fa-globe" /></a></li>
              <li><a href="https://twitter.com/_le_futuriste" title="My Twitter"><i class="fab fa-twitter" /></a></li>
              <li><a href="https://github.com/lefuturiste" title="My Github"><i class="fab fa-github" /></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-container">
        <div class="content-content container">
          <scale-transition group>
            <div class="content-items-mosaic" v-show="item_show" :key="item_show">
              <div class="item-card" v-for="item in items">
                <div class="card-header">
                    <img :src="item.image" :alt="item.title">
                </div>
                <div class="card-content">
                  <div>{{item.title}}</div>
                </div>
              </div>
            </div>
          </scale-transition>
          <div class="content-nav">
            <ul>
              <li @click="setTagView('all')" v-bind:class="{selected:is_all_selected}">
                All
              </li>
              <li v-for="tag in tags" @click="setTagView(tag)" v-bind:class="{selected:tag_selected[tag.slug]}">
                {{tag.title}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-container" v-show="item_show">
        <div class="footer-content container">
          <div class="footer-logo">
            <a href="https://lefuturiste.fr"><img src="https://src.lefuturiste.fr/images/lefuturiste-300-300.png" alt="logo"/></a>
          </div>
          <div class="footer-links">
              <ul>
                <li><a href="https://github.com/lefuturiste/whatiuse">Sources</a></li>
                <li><a href="https://lefuturiste.fr">Site Web</a></li>
                <li><a href="https://lefuturiste.fr/twitter">Twitter</a></li>
              </ul>
          </div>
        </div>
      </div>
    </div>
    </scale-transition>
  </div>
</template>

<script>
import {ScaleTransition, FadeTransition} from 'vue2-transitions'
export default {
  name: 'app',
  components: {
    ScaleTransition,
    FadeTransition
  },
  data () {
    return {
      item_show: true,
      items: [],
      items_all: [],
      tags: [],
      show: false,
      tag_selected: [],
      is_all_selected: true
    }
  },
  created () {
    var data = require('./data.json')
    this.items = data.items
    this.items_all = data.items
    this.tags = data.tags
    setTimeout(() => {
      this.show = true
    }, 200)
  },
  methods: {
    setTagView: function (tag) {
      this.item_show = false
      this.tag_selected = []
      if(tag == "all"){
        this.items = this.items_all
        this.is_all_selected = true
      }else{
        this.is_all_selected = false
        this.items = this.items_all.filter((item) => {
          return item.tag === tag.slug
        })
        this.tag_selected[tag.slug] = true
      }
      setTimeout(() => {
        this.item_show = true
      }, 200)
    }
  }
}
</script>

<style lang="scss">
 @import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css');
 @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
 @import "../node_modules/normalize.css/normalize.css";

 $border-color: #ecf0f1;
 $text-color: #2c3e50;

 body {
    font-family: 'Lato', sans-serif;
    overflow-x: hidden;
 }
.container {
  width: 80%;
  margin: 0 auto;
}
 .header-container {
   background-image: linear-gradient(to right bottom, #1abc9c, #11b98f, #12b680, #1cb270, #27ae60);
   color: white;
   border-bottom: 5px solid $border-color;
   width: 100%;
   padding-top: 10em;
   padding-bottom: 2em;
   .header-content {
     display: flex;
     justify-content: space-between;
     .header-title {
       font-size: 5em;
       margin-bottom: 0;
     }
     .header-description {
       color: #ecf0f1;
       font-size: 1.2em;
       margin-top: 1.2em;
       margin-left: 10px;
     }
    }
    .header-socials {
      display: flex;
      align-items: flex-end;
      padding-right: 10px;

      .socials {
        display: grid;
        grid-template-columns: repeat(3, 40%);
        grid-column-gap: 15px;
        li {
          font-size: 1.5em;
          list-style-type: none;
          a {
            color: white;
            opacity: 0.8;
            transition: 0.2s opacity;
          }
          a:hover {
            opacity: 1;
            transition: 0.2s opacity;
          }
        }
      }
    }
 }
 $item-card-border: #bdc3c7;
 $item-card-border-radius: 5px;
 .content-container {
   color: $text-color;
   margin-top: 20px;
   .content-content {
     display: grid;
     grid-template-columns: 70% 30%;
     grid-column-gap: 25px;
     .content-items-mosaic {
       margin-bottom: 3em;
       display: grid;
       grid-template-columns: repeat(4, 24%);
       grid-gap: 10px;
     }
     .item-card {
       border-radius: $item-card-border-radius;
       border: 1px solid $item-card-border;
       padding-left: 20px;
       padding-right: 20px;
       .card-header {
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 30px;
         img {
           width: 100%;
           height: 100%;
         }
       }
       .card-content {
         display: flex;
         justify-content: center;
         text-align: center;
         padding-top: 0px;
         padding-bottom: 15px;
         font-weight: 100;
       }

     }
     // .item-card:last-of-type{
     //     border-right: 1px solid $item-card-border;
     // }
     // .item-card:first-of-type {
     //   border-top-left-radius: $item-card-border-radius;
     //   border-bottom-left-radius: $item-card-border-radius;
     //
     //   border-top-right-radius: 0;
     //   border-bottom-right-radius: 0;
     // }
     // .item-card:last-of-type {
     //   border-top-left-radius: 0;
     //   border-bottom-left-radius: 0;
     //
     //   border-top-right-radius: $item-card-border-radius;
     //   border-bottom-right-radius: $item-card-border-radius;
     // }
   }
   .content-nav {
     ul {
       position: sticky;
       top: 10px;
       display: flex;
       justify-content: center;
       flex-direction: column;
     }
     li {
       padding: 0.2em;
       padding-top: 0.8em;
       padding-bottom: 0.8em;
       border-bottom: 1px solid $border-color;
       list-style-type: none;
       opacity: 0.8;
       transition: 0.2s opacity;
     }
     li:first-of-type {
       border-top: 1px solid $border-color;
     }
     .selected {
       opacity: 1;
       font-weight: bold;
     }
     li:hover {
       opacity: 1;
       cursor: pointer;
       transition: 0.2s opacity;
     }
   }
 }

 .footer-container {
   background-color: #ecf0f1;
   border-top: 1px solid #bdc3c7;
   padding-top: 1.5em;
   padding-bottom: 1.5em;
   .footer-content {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
     .footer-logo {
       padding-left: 5px;
       img {
         width: 3em;
         border-radius: 50%;
       }
     }
     .footer-links {
       ul {
         display: flex;
         align-items: center;
         justify-content: space-between;
         margin-top: 12px;
         li {
           list-style-type: none;
           margin-right: 2em;
           a {
             color: $text-color;
             opacity: 0.8;
             transition: 0.2s opacity;
             text-decoration: none;
           }
           a:hover {
             opacity: 1;
             transition: 0.2s opacity;
           }
         }
       }
     }
   }
 }

</style>
