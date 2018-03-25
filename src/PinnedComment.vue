<template>
  <transition name="fade">
    <wf-comment-card
      v-if="comment"
      class="pinned-comment"
      :style="{backgroundColor}"
      :key="comment.commentId"
      :comment="comment"/>
  </transition>
</template>
<script>
import { BACKGROUND_COLOR } from './constants';

export default {
  name: 'pinned-comment',
  props: ['bus', 't'],
  data() {
    return {
      comment: undefined,
      backgroundColor: BACKGROUND_COLOR,
    };
  },
  watch: {
    comment(newVal) {
      const newId = newVal ? newVal.commentId : null;
      this.$set(this.bus.$data.plugins, 'WfPinnedComment', newId);
      this.bus.$emit('WfPinnedComment.pinnedCommentId', newId);
    },
  },
  created() {
    const { pageURL } = this.bus.config;
    this.bus.db.ref(`plugins/WfPinnedComment/a/x/x/x/u/${pageURL}`).on('value', (snap) => {
      const commentId = snap.val();
      if (!commentId) { this.comment = null; return; }
      this.bus.db.ref(`comments/${commentId}`).once('value')
        .then((snap) => {
          const comment = snap.val();
          if (!comment) { this.comment = null; return; }
          this.comment = Object.assign({}, comment, { commentId, parentCommentId: null });
        });
    });

    this.bus.db.ref('plugins/WfPinnedComment/a/x/x/x/u/options').on('value', (snap) => {
      const options = snap.val() || {};
      const { backgroundColor } = options;
      this.backgroundColor = backgroundColor ? `#${backgroundColor}` : BACKGROUND_COLOR;
    });
  },
};
</script>
<style scoped>
.pinned-comment { margin-bottom: 8px; }
.fade-enter-active, .fade-leave-active { transition: opacity .5s }
.fade-enter { opacity: 0 }
.fade-enter-to { opacity: 1 }
</style>
