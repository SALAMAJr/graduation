part of 'order_cubit.dart';

abstract class OrderState extends Equatable {
  const OrderState();

  @override
  List<Object?> get props => [];
}

class OrderInitial extends OrderState {}

class OrderLoading extends OrderState {}

class OrderCreated extends OrderState {
  final OrderResponseModel orderResponse;

  const OrderCreated(this.orderResponse);

  @override
  List<Object?> get props => [orderResponse];
}

class OrdersLoaded extends OrderState {
  final List<OrderModel> orders;

  const OrdersLoaded(this.orders);

  @override
  List<Object?> get props => [orders];
}

class OrderDeleted extends OrderState {
  final String deletedOrderId;

  const OrderDeleted(this.deletedOrderId);

  @override
  List<Object?> get props => [deletedOrderId];
}

class OrderError extends OrderState {
  final String message;

  const OrderError(this.message);

  @override
  List<Object?> get props => [message];
}
