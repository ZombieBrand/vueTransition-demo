<template>
  <div>
    <transition-group tag="div" v-bind:name="name" class="content">
      <div
        class="block"
        v-for="(list, index) in bgColor"
        v-bind:key="list"
        v-bind:style="{ 'background-color': list }"
        v-show="index === curIndex"
        v-on:wheel="wheelEvent($event);"
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
  data() {
    return {
      bgColor: ["red", "blue", "yellow", "green"],
      curIndex: 0,
      name: "",
      canWheel: true,
      endCount: 0
    };
  },
  methods: {
    wheelEvent(e) {
      if (this.canWheel === true) {
        if (e.deltaY > 0) {
          if (this.curIndex === this.bgColor.length - 1) {
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
    }
  }
};
</script>
