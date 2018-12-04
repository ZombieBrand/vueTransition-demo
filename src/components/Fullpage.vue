<template>
  <div v-on:wheel="wheelEvent($event);">
    <transition-group tag="div" v-bind:name="name" class="content">
      <div
        class="block"
        v-for="(list, index) in page"
        v-bind:key="list"
        v-bind:style="{
          'background-color':
            bgColor[index] && bgColor
              ? bgColor[index]
              : baseBgc[Math.floor(Math.random() * 4)]
        }"
        v-show="index === curIndex"
        v-on:transitionend="end"
      >
        {{ list }}
      </div>
    </transition-group>
  </div>
</template>
<style>
.content {
  height: 100%;
  width: 100%;
}
.block {
  height: 100%;
  width: 100%;
  position: absolute;
}
/*进入过程到结束状态*/
.down-enter-active {
  transition: all 0.85s ease;
  transform: translateY(0);
}
/*开始初始化状态*/
.down-enter {
  transform: translateY(100%);
}
/*离开初始化状态*/
.down-leave {
  transform: translateY(0);
}
/*脱离过程到结束状态*/
.down-leave-active {
  transform: translateY(-100%);
  transition: all 1s ease;
}
/*进入过程到结束状态*/
.up-enter-active {
  transform: translateY(0);
  transition: all 1s ease;
} /*脱离过程到结束状态*/
.up-leave-active {
  transform: translateY(100%);
  transition: all 1s ease;
} /*开始初始化状态*/
.up-enter {
  transform: translateY(-100%);
} /*离开初始化状态*/
.up-leave {
  transform: translateY(0);
}
</style>
<script>
export default {
  props: {
    bgColor: {
      type: Array
    },
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      curIndex: 0,
      name: "",
      canWheel: true,
      endCount: 0,
      baseBgc: [],
      addColors: null
    };
  },
  methods: {
    wheelEvent(e) {
      if (this.canWheel === true) {
        if (e.deltaY > 0) {
          if (this.curIndex === this.page - 1) {
            this.canWheel = true;
            return;
          }
          this.name = "down";
          this.curIndex++;
        }
        if (e.deltaY < 0) {
          if (this.curIndex === 0) {
            this.canWheel = true;
            return;
          }
          this.name = "up";
          this.curIndex--;
        }
        this.canWheel = false;
      } else {
        return;
      }
    },
    end() {
      this.endCount++;
      if (this.endCount === 2) {
        this.canWheel = true;
        this.endCount = 0;
      }
    },
    randomColor() {
      this.addColors = this.page - this.bgColor.length;
      function getRandColor() {
        var str = "0123456789abcdef";

        var arr = [];

        for (var i = 0; i < 6; i++) {
          var random = Math.floor(Math.random() * 16);

          arr.push(str[random]);
        }

        return "#" + arr.join("");
      }
      if (this.addColors > 0) {
        for (let i = 0; i < this.addColors; i++) {
          this.baseBgc.push(getRandColor());
        }
      }
    }
  },
  mounted() {
    this.randomColor();
  }
};
</script>
