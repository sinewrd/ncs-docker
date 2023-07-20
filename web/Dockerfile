FROM nginx:latest

# COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

# 複製靜態檔案
COPY ./html /usr/share/nginx/html

# 複製自定義的 Nginx 設定檔到容器內的 /etc/nginx/conf.d/ 目錄
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

# RUN envsubst /app < /etc/nginx/conf.d/vue.conf > /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]