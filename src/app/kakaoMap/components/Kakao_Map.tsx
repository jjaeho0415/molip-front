'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
useKakaoLoader;
import { useEffect, useRef, useState } from 'react';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import Loading from '@/components/Loading';
import styles from './map.module.css';
// import Icon_marker_current from '../../../../public/icons/kakaoMap/Icon_marker_current.svg';
// import Icon_marker from '../../../../public/icons/kakaoMap/Icon_marker.svg';
// import Icon_marker_selected from '../../../../public/icons/kakaoMap/Icon_marker_selected.svg';

interface IKakaoMap {
	keyword: string;
}

export default function Kakao_Map({ keyword }: IKakaoMap) {
	useKakaoLoader();
	const mapRef = useRef<kakao.maps.Map>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [position, setPosition] = useState<{ lat: number; lng: number }>({
		lat: 33.450701,
		lng: 126.570667,
	});

	// const markerIcon = new kakao.maps.MarkerImage(
	// 	Icon_marker,
	// 	new kakao.maps.Size(24, 24),
	// 	{
	// 		alt: 'marker img',
	// 	},
	// );

	const [info, setInfo] = useState<{
		content: string;
		position: { lat: number; lng: number };
	} | null>(null);

	const [markers, setMarkers] = useState<
		{ position: { lat: number; lng: number }; content: string }[]
	>([]);

	const [map, setMap] = useState<kakao.maps.Map | null>(null);

	useEffect(() => {
		const watchId = navigator.geolocation.watchPosition(
			(pos) => {
				setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
				setIsLoading(false);
			},
			(err) => {
				console.error(err);
			},
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	useEffect(() => {
		if (!map) return;
		const ps = new kakao.maps.services.Places();

		ps.keywordSearch(keyword, (data, status) => {
			if (status === kakao.maps.services.Status.OK) {
				const bounds = new kakao.maps.LatLngBounds();
				const newMarkers = data.map(
					(place: kakao.maps.services.PlacesSearchResultItem) => {
						const position = {
							lat: parseFloat(place.y),
							lng: parseFloat(place.x),
						};
						bounds.extend(new kakao.maps.LatLng(position.lat, position.lng));
						return {
							position,
							content: place.place_name,
						};
					},
				);

				setMarkers(newMarkers);
				map.setBounds(bounds);
			}
		});
	}, [keyword, map]);

	return (
		<>
			{isLoading ? (
				<div className={styles.LoadingBox}>
					<Loading backgroundColor='white' />
				</div>
			) : (
				<Map // 지도를 표시할 Container
					center={{ lat: position.lat, lng: position.lng }}
					style={{
						// 지도의 크기
						width: '100%',
						height: 'calc(100vh - 96.2px)',
					}}
					level={3} // 지도의 확대 레벨
					ref={mapRef}
					onCreate={setMap}
				>
					{/* <ZoomControl position={'RIGHT'} /> */}
					{markers.map((marker) => (
						<MapMarker
							key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
							position={marker.position}
							onClick={() => setInfo(marker)}
						>
							{info && info.content === marker.content && (
								<div
									style={{
										color: 'black',
										backgroundColor: 'transparent',
										border: 'none',
									}}
								>
									{marker.content}
								</div>
							)}
						</MapMarker>
					))}
					<MapMarker
						position={{ lat: position.lat, lng: position.lng }}
						// image={{
						// 	src: Icon_marker_current,
						// 	size: { width: 24, height: 24 },
						// }}
					></MapMarker>
				</Map>
			)}
		</>
	);
}
