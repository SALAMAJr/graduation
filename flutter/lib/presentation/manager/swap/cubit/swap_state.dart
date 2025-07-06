part of 'swap_cubit.dart';

abstract class SwapState extends Equatable {
  const SwapState();

  @override
  List<Object?> get props => [];
}

class SwapInitial extends SwapState {}

class SwapLoading extends SwapState {}

class SwapLoaded extends SwapState {
  final List<SwapProductModel> products;

  const SwapLoaded(this.products);

  @override
  List<Object?> get props => [products];
}

class SwapError extends SwapState {
  final String message;

  const SwapError(this.message);

  @override
  List<Object?> get props => [message];
}
