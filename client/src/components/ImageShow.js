import React, { useEffect, useState } from 'react';
import './imageShow.css'
export default function ImageShow({ Image }) {
	const [img, setImg] = useState({ name: '', url: '' });
	useEffect(() => {
		if (!img) return
		const name = /(?<=^\d+-).*(?=\.\w+$)/g.exec(Image.image)[0];
		const url = `http://localhost:5000/getimage/${Image.image}`;
		setImg({ name, url })
	}, []);
	return <div className='card'>
		<img src={img.url || ""} alt={img.name || "img"} style={{ objectFit: "cover" }} />
		<div className="name">{img.name}</div>
	</div>
}
