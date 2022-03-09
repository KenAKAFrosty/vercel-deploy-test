import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../functions/postsFunctions'
import utilStyles from '../../styles/utils.module.css'
import postsStyles from './posts.module.css'

export default function Post( { postData } ) { 
    return (
        <Layout >
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={utilStyles.headingX1}> 
                {postData.title} 
            </h1>
            <p className={ `${utilStyles.lightText} ${postsStyles.date}` }>
                {postData.date}
            </p>
            <div dangerouslySetInnerHTML={ {__html: postData.contentHtml} } />
        </Layout>
    )
}

export async function getStaticPaths(){ 
    const paths = getAllPostIds();
    return { 
        paths,
        fallback:false
    }
}

export async function getStaticProps( {params} ) { 
    const postData = await getPostData(params.id);
    return { 
        props: { 
            postData
        }
    }
}