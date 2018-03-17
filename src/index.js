import PinnedCommentHeader from './PinnedCommentHeader';
import PinnedComment from './PinnedComment';
import PinThisComment from './PinThisComment';

export default {
  id: 'WfPinnedComment',
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
};
