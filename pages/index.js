import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../functions/postsFunctions'

export async function getStaticProps(){ 
  const allPostsData = getSortedPostsData();
  const staticProps = { 
      allPostsData
  }

  return { 
    props:staticProps 
  }
}

export default function Home( { allPostsData } ) {
  return (
    <Layout isHomePage={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h4> Hi, I'm a heading.</h4>
        <p>
          (This is a sample website.{' '}
          Learn with <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg} >Posts</h2>
        <ul className={utilStyles.list} >
          {allPostsData.map( ( {id, date, title} ) => {
            return (
              <li className={ utilStyles.listItem } key={ id }>
                <Link href={ `/posts/${id}` }>
                  <a>{ title } </a>
                </Link>
                <br />
                { id }
                <br />
                { date }
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}