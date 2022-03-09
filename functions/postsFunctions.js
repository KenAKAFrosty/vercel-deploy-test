import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join( process.cwd(), 'postsContent');
const fileNames = fs.readdirSync( contentDirectory );


export function getSortedPostsData(){ 
    const allPostsData = fileNames.map( fileName => { 
        const id = fileName.replace(/\.md$/gi,"");
        const fullPath = path.join( contentDirectory, fileName );

        const fileContents = fs.readFileSync( fullPath, 'utf8' );
        const matterResult = matter( fileContents );

        return { id, ...matterResult.data }
    });
   
    return allPostsData.sort( (a,b)=> { 
        if (a.date <= b.date) { return 1 }
        else return -1
    }) 
}

export function getAllPostIds() { 
    return getAllPostIdsFromFilesystem()
}

function getAllPostIdsFromFilesystem(){ 
    return fileNames.map( fileName => { 
        return { 
            params: { 
                id: fileName.replace(/\.md$/,'')
            }
        }

    })
}

export async function getPostData(id) {
    return getPostWithFilenameAsId(id, "md");
  }

async function getPostWithFilenameAsId(id, extension) { 
    const fullPath = path.join(contentDirectory, `${id}.${extension}`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    const matterResult = matter(fileContents)

    const processedContent = await remark()
                                    .use(html)
                                    .process(matterResult.content);
    
    const contentHtml = processedContent.toString();
  
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
}