<template>
  <div>
    <div>
      <UserTableSpace />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    UserTableSpace:resolve=>{require(['@/components/module/table/UserTableSpace'],resolve)},
  },
};
</script>