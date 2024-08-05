//how to add loading animation to an svg image: https://blog.logrocket.com/cooler-loading-animations-svg/
const LoadingIcon = () => {
    return (
        <svg width="154" height="102" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="iconfilter" primitiveUnits="objectBoundingBox" >
                    <feFlood flood-color="#FFDAB9" />
                    <feOffset>
                        <animate attributeName="dx" from="0" to="1" dur="4s" repeatCount="indefinite" />
                    </feOffset>
                    <feComposite operator="in" in2="SourceGraphic" />
                    <feComposite operator="over" in2="SourceGraphic" />
                </filter>
            </defs>
            <g filter="url(#iconfilter)">
                <path fill="#713A3A" d="M74.947.167C70.521.76 66.99 2.643 66.99 4.409c0 .896 1.533 2.138 3.409 2.761 2.876.954 3.919 2.21 2.744 3.305-.78.726-2.032 1.018-7.346 1.712-11.029 1.439-19.813 3.947-30.163 8.609-6.144 2.767-13.339 7.304-14.898 9.393-.383.512-.993 1.709-1.356 2.659-.921 2.41-1.401 2.791-3.876 3.073-3.161.361-6.32 1.642-9.729 3.946C2.742 41.917 0 45.524 0 47.464c0 1.715 1.849 3.948 4.339 5.239 2.335 1.21 3.868 1.667 6.979 2.079 1.469.195 3.594.668 4.724 1.052 1.995.677 2.17.693 6.16.546 5.859-.215 11.429-1.161 16.227-2.757 2.952-.982 6.893-3.542 11.996-7.792 3.579-2.981 4.539-3.547 5.087-2.999.491.492-.231 2.547-1.632 4.64-1.923 2.875-1.982 3.638-.315 4.101 2.128.591 5.907.127 11.5-1.411 4.077-1.121 8.739-1.512 9.345-.782.3.361.287.493-.084.903-.649.718-2.887 1.836-7.459 3.727-2.255.933-4.555 1.997-5.11 2.364-.901.596-.96.696-.545.928.255.143 2.924.36 5.93.484 7.144.293 8.643.787 6.588 2.172-.844.569-4.929 1.942-8.665 2.912-2.54.66-5.305 1.789-5.118 2.091.224.364 2.604.962 5.503 1.384 3.557.518 4.136.647 3.984.893-.252.407-2.898.798-20.924 3.085-14.505 1.841-26.365 3.487-27.072 3.758-.508.196-.494.591.08 2.1 1.274 3.354 5.81 9.9 9.129 13.176 6.95 6.858 14.996 9.715 31.466 11.174 6.631.587 41.881.683 45.424.124 6.991-1.103 13.698-5.023 17.64-10.308 1.166-1.563 3.802-6.37 3.603-6.569-.07-.07-1.498.279-3.174.775-11.437 3.384-19.99 4.52-38.724 5.144l-4.364.146 3.337-1.374c5.568-2.293 7.233-3.294 5.974-3.592-.915-.217-3.521-.425-8.669-.693-4.568-.238-6.511-.531-7.058-1.066-.467-.456.877-1.221 3.56-2.025 10.531-3.157 10.873-3.383 6.334-4.194-1.207-.215-3.869-.577-5.916-.803-6.153-.68-8.213-1.263-8.213-2.323 0-.401 1.681-1.031 3.721-1.394.847-.15 4.543-.382 8.214-.515 7.021-.254 9.321-.59 10.682-1.559 1.277-.909 1.003-1.334-2.224-3.456-3.033-1.995-4.48-3.49-4.48-4.629 0-1.286 1.617-1.035 5.903.918 7.249 3.302 13.307 4.263 25.445 4.038 8.141-.152 9.063-.302 16.135-2.628 8.523-2.802 12.802-4.952 15.81-7.94 2.176-2.162 2.788-3.595 2.626-6.145-.14-2.2-1.143-4.139-3.186-6.162-2.104-2.084-4.5-3.353-7.605-4.029-2.479-.539-3.347-.936-3.77-1.725-.137-.257-.435-1.539-.663-2.849-.553-3.192-.999-4.201-2.397-5.432-1.793-1.578-6.883-4.717-11.506-7.096-12.33-6.345-25.542-10.409-36.459-11.214-2.761-.204-4.567-.449-4.814-.654-.218-.181-.396-.73-.396-1.22 0-1.224.979-2.074 3.421-2.973 2.118-.779 2.996-1.584 2.996-2.746 0-1.498-2.054-2.907-5.435-3.727-1.636-.397-7.272-.693-8.938-.469M17.31 41.637c.311.443.4 1.292.4 3.793 0 4.152-.121 4.363-2.5 4.363-2.559 0-4.557-.654-5.885-1.927-.92-.881-1.112-1.229-1.112-2.016 0-1.815 1.439-3.023 4.953-4.161 2.426-.786 3.62-.801 4.144-.052m128.499 4.902c1.721.841 2.574 3.531 1.667 5.256-1 1.901-4.651 4.276-7.074 4.601-.927.124-1.044.074-1.282-.555-.145-.38-.263-2.775-.263-5.321v-4.631l3.016.1c2.191.072 3.267.223 3.936.55" />

            </g></svg>
    )
}

export default LoadingIcon