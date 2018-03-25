<template>
  <i-dropdown-item v-if="shouldRender" @on-click="handleClick">
    {{itemTitle}}
  </i-dropdown-item>
</template>
<script>
export default {
  name: 'pin-this-comment',
  props: [
    'comment',
    't',
    'pluginData',
    'commonData',
    'db',
    'config',
  ],
  computed: {
    user() {
      return this.commonData.user;
    },
    pinnedCommentId() {
      return this.pluginData.pinnedCommentId;
    },
    shouldRender() {
      return this.user && this.user.isAdmin;
    },
    itemTitle() {
      return this.t(this.isPinned ? 'unpin' : 'pin');
    },
    isPinned() {
      return this.comment.commentId === this.pinnedCommentId;
    },
  },
  methods: {
    handleClick() {
      const successMsg = this.t(this.isPinned ? 'unpin_success' : 'pin_success');
      this.db.ref(`plugins/WfPinnedComment/a/x/x/x/u/${this.config.pageURL}`).set(this.isPinned ? null : this.comment.commentId)
        .then(() => {
          this.$Message.success(successMsg);
        })
        .catch(() => {
          this.$Message.error(this.t('error'));
        });
    },
  },
};
</script>
