<template>
  <transition name="fade">
    <wf-comment-card
      v-if="comment"
      class="pinned-comment"
      :style="{ backgroundColor }"
      :key="comment.commentId"
      :comment="comment"/>
  </transition>
</template>
<script>
import { BACKGROUND_COLOR } from './constants';

export default {
  name: 'pinned-comment',
  props: [
    'pluginData',
    'db',
    'config',
  ],
  data() {
    return {
      comment: undefined,
      backgroundColor: BACKGROUND_COLOR,
    };
  },
  watch: {
    comment(newVal) {
      const newId = newVal ? newVal.commentId : null;
      this.$set(this.pluginData, 'pinnedCommentId', newId);
      this.$forceUpdate();
    },
  },
  created() {
    this.db.ref(`plugins/WfPinnedComment/a/x/x/x/u/${this.config.pageURL}`).on('value', (snapshot) => {
      const commentId = snapshot.val();
      if (!commentId) { this.comment = null; return; }
      this.db.ref(`comments/${commentId}`).once('value')
        .then((snapshot) => {
          const comment = snapshot.val();
          if (!comment) { this.comment = null; return; }
          this.comment = Object.assign({}, comment, { commentId, parentCommentId: null });
        });
    });

    this.db.ref('plugins/WfPinnedComment/a/x/x/x/u/options').on('value', (snapshot) => {
      const { backgroundColor } = snapshot.val() || {};
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
