import PinnedCommentHeader from './PinnedCommentHeader';
import PinnedComment from './PinnedComment';
import PinThisComment from './PinThisComment';

export default {
  components: {
    'comments.before': [
      PinnedCommentHeader,
      PinnedComment,
    ],
    'comment.menu.top': [
      PinThisComment,
    ],
  },
  // hooks: {},
  // widgets: {},
  translation: {
    fallback: 'en',
    en: {
      error: 'Something went wrong.',
      pin: 'Pin',
      pinned_comment: 'Pinned Comment',
      pin_success: 'Pinned!',
      unpin: 'Unpin',
      unpin_success: 'Unpinned!',
    },
    'zh-CN': {
      error: '置顶操作出错了。',
      pin: '置顶',
      pinned_comment: '置顶评论',
      pin_success: '置顶成功！',
      unpin: '取消置顶',
      unpin_success: '取消置顶成功！',
    },
  },
};
