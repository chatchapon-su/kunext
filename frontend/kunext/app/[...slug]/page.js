import Bar from '@/components/bar'

export default async function CatchAllPage({ params }) {
    const { slug } = await params;
    return (
        <div>
            <Bar pagepath={slug}/>
        </div>
    );
}