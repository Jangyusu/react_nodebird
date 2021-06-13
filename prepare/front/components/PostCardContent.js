import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hastag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          )
        }
        return v
      })}
    </div>
  )
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
}

export default PostCardContent
