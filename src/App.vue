<template>
  <div id="app">
    <scale-transition>
      <div v-show="showContent">
        <div class="header-container">
          <div class="header-content container">
            <div class="header-title-container">
              <h1 class="header-title">
                What I use ?
              </h1>
              <h2 class="header-description">
                List of all tools, platforms, technologies, languages that I use, categorized.
              </h2>
            </div>
            <div class="header-socials">
              <ul class="socials">
                <li>
                  <a href="https://lefuturiste.fr" title="My website">
                    <i class="fas fa-globe" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/_le_futuriste" title="My Twitter">
                    <i class="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/lefuturiste" title="My Github">
                    <i class="fab fa-github" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-container">
          <div class="content-content container">
            <div>
              <fade-transition>
                <div class="content-items-mosaic" v-show="showItems">
                  <a
                    v-for="item in items"
                    :key="item.title"
                    :href="item.link"
                    class="item-card"
                    v-tooltip.top="{ content: item.description, delay: 0 }"
                  >
                    <div class="card-header">
                      <img class="card-image" :src="imageBaseUrl + '/' + item.image" />
                    </div>
                    <div class="card-content">
                      <div>{{ item.title }}</div>
                    </div>
                  </a>
                </div>
              </fade-transition>
            </div>
            <div class="content-nav">
              <ul>
                <li
                  @click="setTagView('all')"
                  v-bind:class="{ selected: isAllSelected }"
                >
                  All
                </li>
                <li 
                  v-for="tag in tags"
                  :key="tag.title"
                  @click="setTagView(tag)"
                  v-bind:class="{ selected: selectedTag[tag.slug] }"
                >
                  {{ tag.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-container">
          <div class="footer-content container">
            <div class="footer-logo">
              <a href="https://lefuturiste.fr">
                <img src="https://src.lefuturiste.fr/images/lefuturiste-300-300.png" alt="logo" />
              </a>
            </div>
            <div class="footer-links">
              <ul>
                <li>
                  <a href="https://github.com/lefuturiste/whatiuse">
                    Sources
                  </a>
                </li>
                <li>
                  <a href="https://lefuturiste.fr">
                    Web site
                  </a>
                </li>
                <li>
                  <a href="https://lefuturiste.fr/twitter">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </scale-transition>
  </div>
</template>

<script>
  import {
    ScaleTransition,
    FadeTransition
  } from 'vue2-transitions'

  export default {
    name: 'app',
    components: {
      ScaleTransition,
      FadeTransition
    },
    data() {
      return {
        imageBaseUrl: '/images',
        showItems: true,
        items: [],
        allItems: [],
        tags: [],
        showContent: false,
        selectedTag: [],
        isAllSelected: true
      }
    },
    created() {
      var data = require('./data.json')
      this.items = this.shuffle(data.items)
      this.allItems = data.items
      this.tags = data.tags
      setTimeout(() => { this.showContent = true }, 200)
    },
    methods: {
      shuffle: function (array) {
        let counter = array.length;
        while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
          counter--;
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
        return array;
      },
      setTagView: function (tag) {
        this.showItems = false
        setTimeout(() => {
          this.selectedTag = []
          if (tag == "all") {
            this.items = this.allItems
            this.isAllSelected = true
          } else {
            this.isAllSelected = false
            this.items = this.allItems.filter(item => item.tag === tag.slug)
            this.selectedTag[tag.slug] = true
          }
          this.showItems = true
        }, 400)
      }
    }
  }
</script>

<style lang="scss" src="./style.scss" />
