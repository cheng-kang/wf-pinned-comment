<template>
  <i-dropdown-item v-if="shouldRender" @on-click="handleClick">
    {{itemTitle}}
  </i-dropdown-item>
</template>
<script>
export default {
  name: 'pin-this-comment',
  props: ['bus', 't', 'pluginData', 'comment'],
  data() {
    return {
      pinnedCommentId: undefined,
    };
  },
  computed: {
    shouldRender() {
      const { user } = this.bus;
      return this.isPinnedCommentIdLoaded && user && user.isAdmin;
    },
    itemTitle() {
      return this.t(this.isPinned ? 'unpin' : 'pin');
    },
    isPinned() {
      return this.comment.commentId === this.pinnedCommentId;
    },
    isPinnedCommentIdLoaded() {
      return !(this.pinnedCommentId === undefined);
    },
  },
  methods: {
    handleClick() {
      if (!this.isPinnedCommentIdLoaded) return;

      const { pageURL } = this.bus.config;
      const successMsg = this.t(this.isPinned ? 'unpin_success' : 'pin_success');
      this.bus.db.ref(`plugins/WfPinnedComment/a/x/x/x/u/${pageURL}`).set(this.isPinned ? null : this.comment.commentId)
        .then(() => {
          this.$Message.success(successMsg);
        })
        .catch(() => {
          this.$Message.error(this.t('error'));
        });
    },
  },
  created() {
    this.bus.listenTo('WfPinnedComment.pinnedCommentId', pinnedCommentId => {
      this.pinnedCommentId = pinnedCommentId;
    }, this._uid);
  },
  beforeDestroy() {
    this.bus.enough('WfPinnedComment.pinnedCommentId', null, this._uid);
  },
};
</script>
