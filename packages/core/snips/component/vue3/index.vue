<template>
  <div class="{{rootCls}}">
    {{name}} here!
  </div>
</template>
<script>
import {defineComponent} from 'vue';
export default defineComponent({
  name: "{{name}}",
  setup(props, context) {
    return {

    }
  }
});
</script>

<style scoped>
.{{rootCls}} {

}
</style>