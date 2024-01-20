/* eslint-disable react/prop-types */
export default function Comment({ comment }) {
  return (
    <div key={comment.id} className="my-2 p-2 min-w-max border-b">
      <span className="font-[500] bg-green-200 px-2 py-1 rounded">
        {comment.user.username}
      </span>
      <p className="px-3 py-2">{comment.text}</p>
    </div>
  );
}
