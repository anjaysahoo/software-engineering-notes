import './App.css';
import {useState, useEffect, useRef} from 'react';

const API_ENDPOINT = `https://hacker-news.firebaseio.com/v0`;
const PAGE_SIZE = 6;

function JobCard({title, time, url, by}) {
    const formattedTime = `${new Date(time).toLocaleDateString()}, ${new Date(time).toLocaleTimeString()}`;

    return (
        <a className={`${url ? "" : "inActive"} card`} href={url} target="_blank">
            <div className="card__title">{title}</div>
            <div className="card__info">
                <div className="card__info__by">By: {by}</div>
                <div className="card__info__time">{formattedTime}</div>
            </div>
        </a>
    )
}

export default function App() {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [totalJobs, setTotalJobs] = useState(false);
    const isFirstLoadDone = useRef(false);
    const jobIdsList = useRef();


    const fetchJobIds = async () => {
        const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
        const list = await response.json();

        return list;
    }

    const loadItems = async () => {
        setIsFetching(true);
        const start = page * PAGE_SIZE;
        const end = page * PAGE_SIZE + PAGE_SIZE;
        console.log("start : " + start + " end : " + end);
        const ids = jobIdsList.current.slice(start, end);
        console.log("ids : ", ids);


        try{
            const tempItems = await Promise.all(
                ids.map(async (id) => {
                    const response = await fetch(`${API_ENDPOINT}/item/${id}.json`);
                    const item = response.json();

                    return item;
                })
            )

            setIsFetching(false);
            setPage((prevPage) => prevPage + 1);

            console.log("tempitems : ", tempItems);
            setItems((prevItems) => [...prevItems, ...tempItems]);
        }
        catch(error){
            setIsFetching(false)
            console.log("error loading items : ", error);
        }
    }

    useEffect(() => {
        console.log("useEffect called");
        if(!isFirstLoadDone.current){

            isFirstLoadDone.current = true;
            const initialLoad = async () => {
                jobIdsList.current = await fetchJobIds();
                setTotalJobs(jobIdsList.current.length);

                console.log("jobIdsList : ", jobIdsList.current);

                await loadItems();
            }

            initialLoad()
        }
    },[])

    return (
        <>
            <div className="board">
                <h1> Hacker News Jobs Board</h1>
                <div className="job-list">
                    {
                        items.map((item) => (
                            <JobCard
                                key={item.id}
                                title = {item.title}
                                time = {item.time}
                                url = {item.url}
                                by = {item.by}/>
                        ))
                    }
                </div>
                {page * PAGE_SIZE  < totalJobs &&
                    <button onClick={() => loadItems()}>

                        {isFetching ? <span> Loading </span> : <span> Load More Jobs</span>}
                    </button>
                }
            </div>
        </>
    );
}
