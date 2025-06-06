#!/bin/bash

SERVICE_NAME="quiz-notification"
IMAGE_NAME="quiz-notification:latest"
LOG_DIR="logs"
LOG_FILE="$LOG_DIR/deploy-qn-$(date +%Y%m%d-%H%M%S).log"
PORT_FORWARD_LOG="$LOG_DIR/port-forward-$(date +%Y%m%d-%H%M%S).log"


mkdir -p "$LOG_DIR"


cd "$(dirname "$0")"


log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=== Starting deployment for $SERVICE_NAME ==="


log "Pulling latest code from Git..."
git pull origin main 2>&1 | tee -a "$LOG_FILE"


log "Switching to Minikube's Docker environment..."
eval $(minikube -p minikube docker-env)

log "Removing old Docker image ($IMAGE_NAME)..."
docker rmi -f $IMAGE_NAME 2>/dev/null || true

log "Building Docker image..."
docker build --no-cache -t $IMAGE_NAME . 2>&1 | tee -a "$LOG_FILE"

log "Deleting existing deployment and services..."
kubectl delete deployment quiz-notification 2>/dev/null || true
kubectl delete service quiz-notification 2>/dev/null || true

log "Deploying to Minikube Kubernetes..."
kubectl apply -f kubernetes/ 2>&1 | tee -a "$LOG_FILE"

log "Waiting for deployment to complete..."
kubectl rollout status deployment/quiz-notification 2>&1 | tee -a "$LOG_FILE"

log "=== Deployment completed for $SERVICE_NAME ==="



