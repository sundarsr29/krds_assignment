<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px;
}
.grid {
    display: grid;
}
.grid-item {
  background-color: #eaeaea;
  padding: 10px;
}
.grid-inside {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  padding-top: 20px;
  padding-left: 35px;
  padding-bottom: 10px;
}
.grid-inside-item {
    align-content: center;
}

.grid-item {
  background-color: #eaeaea;
  padding: 10px;
}

/* .carousel {
  position: relative;
}

.carousel-inner {
  display: flex;
  overflow: hidden;
}  */

/* .carousel-inner > div {
  flex: 0 0 100%;
  transition: transform 0.5s ease;
}

.carousel-inner > div.active {
  transform: translateX(0);
}
*/
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
} 

.carousel-nav.prev {
  left: 10px;
  color: #fff;
}

.carousel-nav.next {
  right: 10px;
  color: #fff;
}
</style>
<template>
  <div>
    <div class="desktop_design" v-if="change() != true">
      <div>
        <div class="grid-container">
          <div
            class="grid-item"
            v-for="(item, i) in dataset"
            :key="i"
            :style="bg_color(i)"
          >
            <div class="grid-inside">
              <div class="grid-inside-item">
                <img
                  :src="full_data"
                  v-if="i == 0"
                  style="float: left; max-height:30px; max-width: 50px;"
                />
                <div class="pa-4"></div>
              </div>
            </div>
            <div class="grid-inside">
              <div class="grid-inside-item">
                <div>
                  <img :src="item.logo" style="height: 60px; width: 70px" />
                  <p style="color: #fff;">{{ item.title }}</p>
                  <hr />
                  <p class="pt-1" style="color: #fff;">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
              <div class="grid-inside-item" style="float: right">
                <img :src="item.image" style="height: 300px; width: 220px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile_view" v-else>
        <div class="grid">
            <div class="grid-item" style="background-color: aliceblue;">
            <img
              :src="full_data"
              style="float: left; max-height:30px; max-width: 50px; "
            />
        </div>
       </div>
        <div class="carousel">
       <div class="carousel-inner">
        <div
          v-for="(item, index) in dataset"
          :key="index"
        >
        <div v-if="index === activeIndex">
          
          <div :style="bg_color(index)">
            <div class="grid-inside">
              <div class="grid-inside-item">
                <div>
                  <img :src="item.logo" style="height: 60px; width: 90px" />
                  <p style="color: #fff;">{{ item.title }}</p>
                  <hr />
                  <p class="pt-1" style="color: #fff;">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
              
            </div>
            <div class="grid-inside">
            <div class="grid-inside-item">
                <img :src="item.image" style="height: 300px; width: 220px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <i @click="prevItem" class="carousel-nav prev material-icons">chevron_left</i>
      <i @click="nextItem" class="carousel-nav next material-icons">chevron_right</i>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataset: [],
      full_data: null,
      activeIndex: 0,
      screenWidth: 0,
    };
  },
  watch: {
    screenWidth: {
        handler(oldValue,newValue) {
         console.log(newValue)
         this.change()
        },
        immediate: true
    }
  },
  created() {
    this.onLoadDataset();
  },
  mounted() {
    this.updateScreenDimensions();
    window.addEventListener('resize', this.updateScreenDimensions);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateScreenDimensions);
  },
  methods: {
    updateScreenDimensions() {
      this.screenWidth = window.innerWidth;
    },
    onLoadDataset() {
      fetch("https://krds-assignment.github.io/aoc/api-assets/data.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.full_data = data.logo;
          this.dataset = data.features;
        })
        .catch((error) => console.error("Error:", error));
    },
    nextItem() {
      this.activeIndex = (this.activeIndex + 1) % this.dataset.length;
      console.log( this.activeIndex)
    },
    prevItem() {
      this.activeIndex = (this.activeIndex - 1 + this.dataset.length) % this.dataset.length;
      console.log( this.activeIndex)
    },
    change() {
      if (this.screenWidth <= 768) {
        return true;
      } else {
        return false;
      }
    },
    bg_color(i) {
      const color = {
        0: "background:lightgreen",
        1: "background:orange",
        2: "background:purple",
        3: "background:red",
        4: "background:maroon",
        5: "background:lightblue",
      };
      return color[i];
    },
  },
};
</script>

